package repositories

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
)

type StandupRepository interface {
	Create(ctx context.Context, standup *entities.Standup) error
	GetByID(ctx context.Context, id uuid.UUID) (*entities.Standup, error)
	GetByTeamID(ctx context.Context, teamID uuid.UUID, dateFrom, dateTo time.Time) ([]entities.Standup, error)
	GetByUserID(ctx context.Context, userID uuid.UUID, dateFrom, dateTo time.Time) ([]entities.Standup, error)
	Update(ctx context.Context, standup *entities.Standup) error
	Delete(ctx context.Context, id uuid.UUID) error
}
