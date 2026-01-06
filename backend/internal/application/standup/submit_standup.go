package standup

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
	"github.com/hayat/scrumai/internal/infrastructure/messaging"
)

type SubmitStandupRequest struct {
	UserID          uuid.UUID `json:"user_id" binding:"required"`
	TeamID          uuid.UUID `json:"team_id" binding:"required"`
	Date            time.Time `json:"date" binding:"required"`
	CompletedTasks  []string  `json:"completed_tasks"`
	InProgressTasks []string  `json:"in_progress_tasks"`
	PlannedTasks    []string  `json:"planned_tasks"`
	Blockers        []string  `json:"blockers"`
	Notes           string    `json:"notes"`
}

type StandupService interface {
	SubmitStandup(ctx context.Context, req SubmitStandupRequest) (*entities.Standup, error)
	GetTeamStandups(ctx context.Context, teamID uuid.UUID, dateFrom, dateTo time.Time) ([]entities.Standup, error)
}

type standupService struct {
	standupRepo repositories.StandupRepository
	publisher   *messaging.AnalysisPublisher
}

func NewStandupService(repo repositories.StandupRepository, pub *messaging.AnalysisPublisher) StandupService {
	return &standupService{
		standupRepo: repo,
		publisher:   pub,
	}
}

func (s *standupService) SubmitStandup(ctx context.Context, req SubmitStandupRequest) (*entities.Standup, error) {
	standup := &entities.Standup{
		UserID:          req.UserID,
		TeamID:          req.TeamID,
		Date:            req.Date,
		CompletedTasks:  req.CompletedTasks,
		InProgressTasks: req.InProgressTasks,
		PlannedTasks:    req.PlannedTasks,
		Blockers:        req.Blockers,
		Notes:           req.Notes,
	}

	if err := s.standupRepo.Create(ctx, standup); err != nil {
		return nil, err
	}

	// Publish message for analysis
	err := s.publisher.PublishAnalysis(messaging.StandupAnalysisMessage{
		StandupID: standup.ID,
		UserID:    standup.UserID,
		TeamID:    standup.TeamID,
	})
	if err != nil {
		// Log error but don't fail the submission
		// In a production app, we'd use a transactional outbox pattern or more robust error handling
	}

	return standup, nil
}

func (s *standupService) GetTeamStandups(ctx context.Context, teamID uuid.UUID, dateFrom, dateTo time.Time) ([]entities.Standup, error) {
	return s.standupRepo.GetByTeamID(ctx, teamID, dateFrom, dateTo)
}
