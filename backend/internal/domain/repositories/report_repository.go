package repositories

import (
	"context"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
)

type ReportRepository interface {
	Create(ctx context.Context, report *entities.Report) error
	GetByID(ctx context.Context, id uuid.UUID) (*entities.Report, error)
	GetByTeamID(ctx context.Context, teamID uuid.UUID) ([]entities.Report, error)
}
