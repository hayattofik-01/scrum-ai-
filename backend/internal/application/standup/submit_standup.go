package standup

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/application/analysis"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
	"github.com/hayat/scrumai/internal/infrastructure/messaging"
)

type SubmitStandupRequest struct {
	UserID     uuid.UUID `json:"user_id" binding:"required"`
	TeamID     uuid.UUID `json:"team_id" binding:"required"`
	Date       time.Time `json:"date" binding:"required"`
	Transcript string    `json:"transcript"`
	Notes      string    `json:"notes"`
}

type StandupService interface {
	SubmitStandup(ctx context.Context, req SubmitStandupRequest) (*entities.Standup, error)
	GetTeamStandups(ctx context.Context, teamID uuid.UUID, dateFrom, dateTo time.Time) ([]entities.Standup, error)
}

type standupService struct {
	standupRepo     repositories.StandupRepository
	publisher       *messaging.AnalysisPublisher
	analysisService analysis.AnalysisService
}

func NewStandupService(repo repositories.StandupRepository, pub *messaging.AnalysisPublisher, analysisService analysis.AnalysisService) StandupService {
	return &standupService{
		standupRepo:     repo,
		publisher:       pub,
		analysisService: analysisService,
	}
}

func (s *standupService) SubmitStandup(ctx context.Context, req SubmitStandupRequest) (*entities.Standup, error) {
	standup := &entities.Standup{
		UserID:     req.UserID,
		TeamID:     req.TeamID,
		Date:       req.Date,
		Transcript: req.Transcript,
		Notes:      req.Notes,
	}

	if err := s.standupRepo.Create(ctx, standup); err != nil {
		return nil, err
	}

	// 1. Perform analysis synchronously
	if err := s.analysisService.AnalyzeStandup(ctx, standup.ID); err != nil {
		// Log error but continue returning the standup
	}

	// 2. Re-fetch the standup to get the updated fields
	updatedStandup, err := s.standupRepo.GetByID(ctx, standup.ID)
	if err == nil {
		standup = updatedStandup
	}

	// 3. Publish message for analysis (as backup or for other consumers)
	err = s.publisher.PublishAnalysis(messaging.StandupAnalysisMessage{
		StandupID: standup.ID,
		UserID:    standup.UserID,
		TeamID:    standup.TeamID,
	})
	if err != nil {
		// Log error but don't fail the submission
	}

	return standup, nil
}

func (s *standupService) GetTeamStandups(ctx context.Context, teamID uuid.UUID, dateFrom, dateTo time.Time) ([]entities.Standup, error) {
	return s.standupRepo.GetByTeamID(ctx, teamID, dateFrom, dateTo)
}
