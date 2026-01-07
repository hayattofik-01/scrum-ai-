package services

import (
	"context"

	"github.com/hayat/scrumai/internal/domain/entities"
)

type ParsedStandupData struct {
	CompletedTasks  []string `json:"completed_tasks"`
	InProgressTasks []string `json:"in_progress_tasks"`
	PlannedTasks    []string `json:"planned_tasks"`
	Blockers        []string `json:"blockers"`
	Notes           string   `json:"notes"`
}

type AIService interface {
	GenerateStandupInsight(ctx context.Context, standup *entities.Standup) (string, error)
	ParseTranscript(ctx context.Context, transcript string) (*ParsedStandupData, error)
}
