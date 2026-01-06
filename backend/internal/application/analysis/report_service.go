package analysis

import (
	"context"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
)

type ReportService interface {
	GetRollingTasks(ctx context.Context, teamID uuid.UUID) ([]entities.RollingTask, error)
	GetTeamReports(ctx context.Context, teamID uuid.UUID) ([]entities.Report, error)
}

type reportService struct {
	rollingTaskRepo repositories.RollingTaskRepository
	reportRepo       repositories.ReportRepository
}

func NewReportService(rtRepo repositories.RollingTaskRepository, reportRepo repositories.ReportRepository) ReportService {
	return &reportService{
		rollingTaskRepo: rtRepo,
		reportRepo:       reportRepo,
	}
}

func (s *reportService) GetRollingTasks(ctx context.Context, teamID uuid.UUID) ([]entities.RollingTask, error) {
	return s.rollingTaskRepo.GetActiveByTeamID(ctx, teamID)
}

func (s *reportService) GetTeamReports(ctx context.Context, teamID uuid.UUID) ([]entities.Report, error) {
	return s.reportRepo.GetByTeamID(ctx, teamID)
}
