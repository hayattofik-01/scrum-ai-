package repositories

import (
	"context"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
)

type RollingTaskRepository interface {
	Create(ctx context.Context, task *entities.RollingTask) error
	GetByID(ctx context.Context, id uuid.UUID) (*entities.RollingTask, error)
	GetActiveByUserID(ctx context.Context, userID uuid.UUID) ([]entities.RollingTask, error)
	GetActiveByTeamID(ctx context.Context, teamID uuid.UUID) ([]entities.RollingTask, error)
	GetByDescription(ctx context.Context, userID uuid.UUID, description string) (*entities.RollingTask, error)
	Update(ctx context.Context, task *entities.RollingTask) error
}
