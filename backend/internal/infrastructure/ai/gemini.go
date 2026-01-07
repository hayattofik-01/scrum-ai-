package ai

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"github.com/hayat/scrumai/internal/config"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/services"
	"google.golang.org/api/option"
)

type geminiService struct {
	client *genai.Client
	model  *genai.GenerativeModel
}

func NewGeminiService(ctx context.Context, cfg *config.Config) (services.AIService, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(cfg.GeminiKey))
	if err != nil {
		return nil, err
	}

	model := client.GenerativeModel("gemini-2.0-flash-lite-001") // Or gemini-pro, using flash for speed/cost
	model.SetTemperature(0.7)

	return &geminiService{
		client: client,
		model:  model,
	}, nil
}

func (s *geminiService) GenerateStandupInsight(ctx context.Context, standup *entities.Standup) (string, error) {
	prompt := s.buildPrompt(standup)

	resp, err := s.model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", err
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", fmt.Errorf("no response from Gemini")
	}

	var sb strings.Builder
	for _, part := range resp.Candidates[0].Content.Parts {
		if txt, ok := part.(genai.Text); ok {
			sb.WriteString(string(txt))
		}
	}

	return sb.String(), nil
}

func (s *geminiService) buildPrompt(standup *entities.Standup) string {
	var sb strings.Builder
	sb.WriteString("Please analyze the following daily standup submission:\n\n")

	sb.WriteString("### Completed Tasks:\n")
	for _, t := range standup.CompletedTasks {
		sb.WriteString("- " + t + "\n")
	}

	sb.WriteString("\n### In Progress Tasks:\n")
	for _, t := range standup.InProgressTasks {
		sb.WriteString("- " + t + "\n")
	}

	sb.WriteString("\n### Planned Tasks:\n")
	for _, t := range standup.PlannedTasks {
		sb.WriteString("- " + t + "\n")
	}

	sb.WriteString("\n### Blockers:\n")
	for _, t := range standup.Blockers {
		sb.WriteString("- " + t + "\n")
	}

	if standup.Notes != "" {
		sb.WriteString("\n### Notes:\n")
		sb.WriteString(standup.Notes + "\n")
	}

	sb.WriteString("\n### Requirements:\n")
	sb.WriteString("1. Provide a concise summary of the progress.\n")
	sb.WriteString("2. Specifically call out any critical blockers or risks to the sprint goal.\n")
	sb.WriteString("3. Suggest a potential improvement or question for the team if any inefficiency is spotted.\n")
	sb.WriteString("4. Keep the tone professional but encouraging.")

	return sb.String()
}

func (s *geminiService) ParseTranscript(ctx context.Context, transcript string) (*services.ParsedStandupData, error) {
	prompt := fmt.Sprintf(`Analyze the following standup transcript and extract the tasks into specific categories.
Return ONLY a valid JSON object with the following structure:
{
  "completed_tasks": ["task 1", "task 2"],
  "in_progress_tasks": ["task 3"],
  "planned_tasks": ["task 4"],
  "blockers": ["blocker 1"],
  "notes": "any additional general notes"
}

Transcript:
%s`, transcript)

	// Clone model to set response format to JSON
	model := s.client.GenerativeModel("gemini-2.0-flash-lite-001")
	model.ResponseMIMEType = "application/json"

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, err
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("no response from Gemini")
	}

	var jsonStr string
	for _, part := range resp.Candidates[0].Content.Parts {
		if txt, ok := part.(genai.Text); ok {
			jsonStr += string(txt)
		}
	}

	var parsedData services.ParsedStandupData
	if err := json.Unmarshal([]byte(jsonStr), &parsedData); err != nil {
		return nil, fmt.Errorf("failed to parse Gemini JSON response: %v", err)
	}

	return &parsedData, nil
}
