package user

import (
	"context"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
)

type CreateTeamRequest struct {
	Name        string    `json:"name" binding:"required"`
	Description string    `json:"description"`
	CreatedBy   uuid.UUID `json:"created_by"`
}

type TeamService interface {
	CreateTeam(ctx context.Context, req CreateTeamRequest) (*entities.Team, error)
	GetTeam(ctx context.Context, id uuid.UUID) (*entities.Team, error)
	ListTeams(ctx context.Context) ([]entities.Team, error)
	AddMember(ctx context.Context, teamID, userID uuid.UUID) error
}

type teamService struct {
	teamRepo repositories.TeamRepository
	userRepo repositories.UserRepository
}

func NewTeamService(teamRepo repositories.TeamRepository, userRepo repositories.UserRepository) TeamService {
	return &teamService{
		teamRepo: teamRepo,
		userRepo: userRepo,
	}
}

func (s *teamService) CreateTeam(ctx context.Context, req CreateTeamRequest) (*entities.Team, error) {
	team := &entities.Team{
		Name:        req.Name,
		Description: req.Description,
		CreatedBy:   req.CreatedBy,
	}

	if err := s.teamRepo.Create(ctx, team); err != nil {
		return nil, err
	}

	return team, nil
}

func (s *teamService) GetTeam(ctx context.Context, id uuid.UUID) (*entities.Team, error) {
	return s.teamRepo.GetByID(ctx, id)
}

func (s *teamService) ListTeams(ctx context.Context) ([]entities.Team, error) {
	return s.teamRepo.List(ctx)
}

func (s *teamService) AddMember(ctx context.Context, teamID, userID uuid.UUID) error {
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return err
	}

	user.TeamID = &teamID
	return s.userRepo.Update(ctx, user)
}
