package ai

import (
	"context"
	"fmt"
	"strings"

	"github.com/hayat/scrumai/internal/config"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/services"
	"github.com/sashabaranov/go-openai"
)

type openaiService struct {
	client *openai.Client
	model  string
}

func NewOpenAIService(cfg *config.Config) services.AIService {
	client := openai.NewClient(cfg.OpenAIKey)
	return &openaiService{
		client: client,
		model:  cfg.OpenAIModel,
	}
}

func (s *openaiService) GenerateStandupInsight(ctx context.Context, standup *entities.Standup) (string, error) {
	prompt := s.buildPrompt(standup)

	resp, err := s.client.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: s.model,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: "You are an expert Scrum Master and Agile Coach. Your goal is to analyze daily standups and provide actionable insights, identify blockers, and suggest efficiency improvements.",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
		},
	)

	if err != nil {
		return "", err
	}

	if len(resp.Choices) == 0 {
		return "", fmt.Errorf("no response from OpenAI")
	}

	return resp.Choices[0].Message.Content, nil
}

func (s *openaiService) buildPrompt(standup *entities.Standup) string {
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
	sb.WriteString("3. Suggest a potential improvement or question for the team if any inefficiency is spotted (e.g., too many in-progress tasks, vague descriptions).\n")
	sb.WriteString("4. Keep the tone professional but encouraging.")

	return sb.String()
}
