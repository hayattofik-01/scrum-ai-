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

type freeLLMService struct {
	model    string
	endpoint string
}

func NewFreeLLMService(cfg *config.Config) services.AIService {
	model := cfg.OpenAIModel
	if model == "" {
		model = "meta-llama-3-8b-instruct"
	}
	return &freeLLMService{
		model:    model,
		endpoint: "https://api.llm7.io/v1",
	}
}

type openaiRequest struct {
	Model    string          `json:"model"`
	Messages []openaiMessage `json:"messages"`
	Stream   bool            `json:"stream"`
}

type openaiMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type openaiResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func (s *freeLLMService) GenerateStandupInsight(ctx context.Context, standup *entities.Standup) (string, error) {
	prompt := s.buildInsightPrompt(standup)

	resp, err := s.query(ctx, []openaiMessage{
		{Role: "user", Content: prompt},
	})
	if err != nil {
		return "", err
	}

	return resp, nil
}

func (s *freeLLMService) ParseTranscript(ctx context.Context, transcript string) (*services.ParsedStandupData, error) {
	prompt := fmt.Sprintf(`Analyze the following standup transcript and extract the tasks into a specific JSON format.
Return ONLY valid JSON.
{
  "completed_tasks": ["task 1", "task 2"],
  "in_progress_tasks": ["task 3"],
  "planned_tasks": ["task 4"],
  "blockers": ["blocker 1"],
  "notes": "any additional general notes"
}

Transcript:
%s`, transcript)

	resp, err := s.query(ctx, []openaiMessage{
		{Role: "user", Content: prompt},
	})
	if err != nil {
		return nil, err
	}

	// Extract JSON from the response
	jsonStart := strings.Index(resp, "{")
	jsonEnd := strings.LastIndex(resp, "}")
	if jsonStart == -1 || jsonEnd == -1 {
		return nil, fmt.Errorf("failed to find JSON in response: %s", resp)
	}
	jsonStr := resp[jsonStart : jsonEnd+1]

	var parsedData services.ParsedStandupData
	if err := json.Unmarshal([]byte(jsonStr), &parsedData); err != nil {
		return nil, fmt.Errorf("failed to parse AI JSON response: %v", err)
	}

	return &parsedData, nil
}

func (s *freeLLMService) query(ctx context.Context, messages []openaiMessage) (string, error) {
	url := s.endpoint + "/chat/completions"
	reqBody, _ := json.Marshal(openaiRequest{
		Model:    s.model,
		Messages: messages,
		Stream:   false,
	})

	req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewBuffer(reqBody))
	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	// No Authorization header for anonymous access

	client := &http.Client{Timeout: 90 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("llm7 api error: status %d, body %s", resp.StatusCode, string(body))
	}

	var openResp openaiResponse
	if err := json.Unmarshal(body, &openResp); err != nil {
		return "", fmt.Errorf("failed to unmarshal openai response: %v", err)
	}

	if len(openResp.Choices) == 0 {
		return "", fmt.Errorf("empty response from llm7")
	}

	return openResp.Choices[0].Message.Content, nil
}

func (s *freeLLMService) buildInsightPrompt(standup *entities.Standup) string {
	var sb strings.Builder
	sb.WriteString("You are a Scrum Master. Analyze this standup and provide a concise summary, call out blockers, and suggest an improvement: \n\n")

	sb.WriteString("Completed: " + strings.Join(standup.CompletedTasks, ", ") + "\n")
	sb.WriteString("In Progress: " + strings.Join(standup.InProgressTasks, ", ") + "\n")
	sb.WriteString("Planned: " + strings.Join(standup.PlannedTasks, ", ") + "\n")
	sb.WriteString("Blockers: " + strings.Join(standup.Blockers, ", ") + "\n")
	if standup.Notes != "" {
		sb.WriteString("Notes: " + standup.Notes + "\n")
	}

	return sb.String()
}
