package analysis

import (
	"context"
	"log"
	"strings"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
	"github.com/hayat/scrumai/internal/domain/services"
)

type AnalysisService interface {
	AnalyzeStandup(ctx context.Context, standupID uuid.UUID) error
}

type analysisService struct {
	standupRepo     repositories.StandupRepository
	rollingTaskRepo repositories.RollingTaskRepository
	reportRepo      repositories.ReportRepository
	aiService       services.AIService
}

func NewAnalysisService(standupRepo repositories.StandupRepository, rtRepo repositories.RollingTaskRepository, reportRepo repositories.ReportRepository, aiService services.AIService) AnalysisService {
	return &analysisService{
		standupRepo:     standupRepo,
		rollingTaskRepo: rtRepo,
		reportRepo:      reportRepo,
		aiService:       aiService,
	}
}

func (s *analysisService) AnalyzeStandup(ctx context.Context, standupID uuid.UUID) error {
	standup, err := s.standupRepo.GetByID(ctx, standupID)
	if err != nil {
		return err
	}

	log.Printf("Analyzing standup %s for team %s", standup.ID, standup.TeamID)

	// 1. Detect Rolling Tasks
	if err := s.detectRollingTasks(ctx, standup); err != nil {
		log.Printf("Error detecting rolling tasks: %v", err)
	}

	// 2. Generate AI Insights
	insight, err := s.aiService.GenerateStandupInsight(ctx, standup)
	if err != nil {
		log.Printf("Error generating AI insight: %v", err)
	} else {
		// Save AI insight as a report
		report := &entities.Report{
			TeamID:     standup.TeamID,
			ReportType: entities.ReportTypeTeamSummary,
			DateFrom:   standup.Date,
			DateTo:     standup.Date,
			Data: map[string]interface{}{
				"standup_id": standup.ID,
				"user_id":    standup.UserID,
				"insight":    insight,
			},
			GeneratedBy: standup.UserID, // Or a system ID
		}
		if err := s.reportRepo.Create(ctx, report); err != nil {
			log.Printf("Error saving AI insight report: %v", err)
		}
	}

	return nil
}

func (s *analysisService) detectBlockers(ctx context.Context, currentStandup *entities.Standup) error {
	if len(currentStandup.Blockers) == 0 {
		return nil
	}

	for _, blocker := range currentStandup.Blockers {
		log.Printf("Detected blocker for user %s: %s", currentStandup.UserID, blocker)
		// Logic: could store in a Blockers table for easier tracking
		// For now, we aggregate into a daily report
	}

	return nil
}

func (s *analysisService) detectRollingTasks(ctx context.Context, currentStandup *entities.Standup) error {
	// Look back 7 days
	dateFrom := currentStandup.Date.AddDate(0, 0, -7)
	previousStandups, err := s.standupRepo.GetByUserID(ctx, currentStandup.UserID, dateFrom, currentStandup.Date.AddDate(0, 0, -1))
	if err != nil {
		return err
	}

	// Task descriptions that appeared in previous days
	seenTasks := make(map[string]int)
	for _, ps := range previousStandups {
		// Check both "in progress" and "planned" tasks from previous days
		for _, task := range ps.InProgressTasks {
			seenTasks[strings.ToLower(strings.TrimSpace(task))]++
		}
		for _, task := range ps.PlannedTasks {
			seenTasks[strings.ToLower(strings.TrimSpace(task))]++
		}
	}

	// Check current standup's "in progress" and "planned" tasks
	currentTasks := append(currentStandup.InProgressTasks, currentStandup.PlannedTasks...)
	for _, task := range currentTasks {
		taskLower := strings.ToLower(strings.TrimSpace(task))
		if count, exists := seenTasks[taskLower]; exists && count >= 1 {
			// This task is rolling!
			log.Printf("Detected rolling task for user %s: %s", currentStandup.UserID, task)

			// Update or create rolling task record
			existing, err := s.rollingTaskRepo.GetByDescription(ctx, currentStandup.UserID, taskLower)
			if err != nil {
				log.Printf("Error searching for existing rolling task: %v", err)
				continue
			}

			if existing != nil {
				existing.LastMentioned = currentStandup.Date
				existing.OccurrenceCount++
				s.rollingTaskRepo.Update(ctx, existing)
			} else {
				newRT := &entities.RollingTask{
					TeamID:          currentStandup.TeamID,
					UserID:          currentStandup.UserID,
					TaskDescription: taskLower,
					FirstMentioned:  currentStandup.Date.AddDate(0, 0, -count), // Approximate
					LastMentioned:   currentStandup.Date,
					OccurrenceCount: count + 1,
					Status:          entities.RollingTaskActive,
				}
				s.rollingTaskRepo.Create(ctx, newRT)
			}
		}
	}

	return nil
}
