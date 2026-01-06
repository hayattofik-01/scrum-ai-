package services

import (
	"context"

	"github.com/hayat/scrumai/internal/domain/entities"
)

type AIService interface {
	GenerateStandupInsight(ctx context.Context, standup *entities.Standup) (string, error)
}
