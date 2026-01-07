package ai

import (
	"context"
	"fmt"
	"time"

	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/services"
)

type mockService struct{}

func NewMockService() services.AIService {
	return &mockService{}
}

func (s *mockService) GenerateStandupInsight(ctx context.Context, standup *entities.Standup) (string, error) {
	// Simulate processing time
	time.Sleep(500 * time.Millisecond)

	return fmt.Sprintf("Mock Insight: The team is making good progress. User %s reported valid updates. No major risks detected, but ensure blockers are addressed.", standup.UserID), nil
}

func (s *mockService) ParseTranscript(ctx context.Context, transcript string) (*services.ParsedStandupData, error) {
	// Simulate processing time
	time.Sleep(500 * time.Millisecond)

	return &services.ParsedStandupData{
		CompletedTasks: []string{
			"Implemented login screen",
			"Fixed bug in user registration",
		},
		InProgressTasks: []string{
			"Working on database migration",
			"Integrating payment gateway",
		},
		PlannedTasks: []string{
			"Write API documentation",
			"Setup CI/CD pipeline",
		},
		Blockers: []string{
			"Waiting for API keys from third-party provider",
			"Database connection timeout issues in staging",
		},
		Notes: "Productive day overall. Need to sync with design team.",
	}, nil
}
