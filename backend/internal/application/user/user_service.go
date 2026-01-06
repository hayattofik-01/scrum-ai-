package user

import (
	"context"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
)

type UpdateUserRequest struct {
	FullName string            `json:"full_name"`
	Role     entities.UserRole `json:"role"`
}

type UserService interface {
	GetUser(ctx context.Context, id uuid.UUID) (*entities.User, error)
	ListUsers(ctx context.Context) ([]entities.User, error)
	UpdateUser(ctx context.Context, id uuid.UUID, req UpdateUserRequest) (*entities.User, error)
	DeleteUser(ctx context.Context, id uuid.UUID) error
	ChangeUserRole(ctx context.Context, id uuid.UUID, role entities.UserRole) error
}

type userService struct {
	userRepo repositories.UserRepository
}

func NewUserService(userRepo repositories.UserRepository) UserService {
	return &userService{userRepo: userRepo}
}

func (s *userService) GetUser(ctx context.Context, id uuid.UUID) (*entities.User, error) {
	return s.userRepo.GetByID(ctx, id)
}

func (s *userService) ListUsers(ctx context.Context) ([]entities.User, error) {
	return s.userRepo.List(ctx)
}

func (s *userService) UpdateUser(ctx context.Context, id uuid.UUID, req UpdateUserRequest) (*entities.User, error) {
	user, err := s.userRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if req.FullName != "" {
		user.FullName = req.FullName
	}
	// Note: Role change should probably be restricted to admins (handled in handler/middleware)
	if req.Role != "" {
		user.Role = req.Role
	}

	if err := s.userRepo.Update(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) DeleteUser(ctx context.Context, id uuid.UUID) error {
	return s.userRepo.Delete(ctx, id)
}

func (s *userService) ChangeUserRole(ctx context.Context, id uuid.UUID, role entities.UserRole) error {
	user, err := s.userRepo.GetByID(ctx, id)
	if err != nil {
		return err
	}

	user.Role = role
	return s.userRepo.Update(ctx, user)
}
