package ai

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/hayat/scrumai/internal/config"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/services"
)

type huggingFaceService struct {
	apiKey   string
	modelID  string
	endpoint string
}

func NewHuggingFaceService(cfg *config.Config) services.AIService {
	return &huggingFaceService{
		apiKey:   cfg.HuggingFaceKey,
		modelID:  "google/gemma-2b-it",
		endpoint: "https://router.huggingface.co/models/",
	}
}

type hfRequest struct {
	Inputs     string                 `json:"inputs"`
	Parameters map[string]interface{} `json:"parameters,omitempty"`
}

type hfResponse []struct {
	GeneratedText string `json:"generated_text"`
}

func (s *huggingFaceService) GenerateStandupInsight(ctx context.Context, standup *entities.Standup) (string, error) {
	prompt := s.buildInsightPrompt(standup)

	resp, err := s.query(ctx, prompt, map[string]interface{}{
		"max_new_tokens": 500,
		"temperature":    0.7,
	})
	if err != nil {
		return "", err
	}

	// Mistral Instruct returns the prompt + generated text, so we strip the prompt if present
	return strings.TrimPrefix(resp, prompt), nil
}

func (s *huggingFaceService) ParseTranscript(ctx context.Context, transcript string) (*services.ParsedStandupData, error) {
	prompt := fmt.Sprintf(`[INST] Analyze the following standup transcript and extract the tasks into a specific JSON format.
Return ONLY valid JSON.
{
  "completed_tasks": ["task 1", "task 2"],
  "in_progress_tasks": ["task 3"],
  "planned_tasks": ["task 4"],
  "blockers": ["blocker 1"],
  "notes": "any additional general notes"
}

Transcript:
%s [/INST]`, transcript)

	resp, err := s.query(ctx, prompt, map[string]interface{}{
		"max_new_tokens": 800,
		"temperature":    0.1, // Low temperature for consistent JSON
	})
	if err != nil {
		return nil, err
	}

	// Extract JSON from the response (Hugging Face models often include parts of the prompt or extra text)
	generatedText := strings.TrimPrefix(resp, prompt)
	jsonStart := strings.Index(generatedText, "{")
	jsonEnd := strings.LastIndex(generatedText, "}")
	if jsonStart == -1 || jsonEnd == -1 {
		return nil, fmt.Errorf("failed to find JSON in response: %s", generatedText)
	}
	jsonStr := generatedText[jsonStart : jsonEnd+1]

	var parsedData services.ParsedStandupData
	if err := json.Unmarshal([]byte(jsonStr), &parsedData); err != nil {
		return nil, fmt.Errorf("failed to parse AI JSON response: %v", err)
	}

	return &parsedData, nil
}

func (s *huggingFaceService) query(ctx context.Context, prompt string, params map[string]interface{}) (string, error) {
	url := s.endpoint + s.modelID
	reqBody, _ := json.Marshal(hfRequest{
		Inputs:     prompt,
		Parameters: params,
	})

	req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewBuffer(reqBody))
	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	if s.apiKey != "" {
		req.Header.Set("Authorization", "Bearer "+s.apiKey)
	}

	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("hugging face api error: status %d, body %s", resp.StatusCode, string(body))
	}

	var hfResp hfResponse
	if err := json.Unmarshal(body, &hfResp); err != nil {
		return "", fmt.Errorf("failed to unmarshal hf response: %v", err)
	}

	if len(hfResp) == 0 {
		return "", fmt.Errorf("empty response from hugging face")
	}

	return hfResp[0].GeneratedText, nil
}

func (s *huggingFaceService) buildInsightPrompt(standup *entities.Standup) string {
	var sb strings.Builder
	sb.WriteString("[INST] You are a Scrum Master. Analyze this standup and provide a concise summary, call out blockers, and suggest an improvement: \n\n")

	sb.WriteString("Completed: " + strings.Join(standup.CompletedTasks, ", ") + "\n")
	sb.WriteString("In Progress: " + strings.Join(standup.InProgressTasks, ", ") + "\n")
	sb.WriteString("Planned: " + strings.Join(standup.PlannedTasks, ", ") + "\n")
	sb.WriteString("Blockers: " + strings.Join(standup.Blockers, ", ") + "\n")
	if standup.Notes != "" {
		sb.WriteString("Notes: " + standup.Notes + "\n")
	}
	sb.WriteString("[/INST]")

	return sb.String()
}
