package repositories

import (
	"context"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
)

type TeamRepository interface {
	Create(ctx context.Context, team *entities.Team) error
	GetByID(ctx context.Context, id uuid.UUID) (*entities.Team, error)
	List(ctx context.Context) ([]entities.Team, error)
	Update(ctx context.Context, team *entities.Team) error
	Delete(ctx context.Context, id uuid.UUID) error
}
