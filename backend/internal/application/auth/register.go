package auth

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
)

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	FullName string `json:"full_name" binding:"required"`
}

type AuthService interface {
	Register(ctx context.Context, req RegisterRequest) (*entities.User, error)
	Login(ctx context.Context, email, password string) (string, *entities.User, error)
	Logout(ctx context.Context, userID uuid.UUID) error
}

type authService struct {
	userRepo       repositories.UserRepository
	sessionService SessionService
	jwtSecret      string
	jwtExp         int
}

func NewAuthService(userRepo repositories.UserRepository, sessionService SessionService, jwtSecret string, jwtExp int) AuthService {
	return &authService{
		userRepo:       userRepo,
		sessionService: sessionService,
		jwtSecret:      jwtSecret,
		jwtExp:         jwtExp,
	}
}

func (s *authService) Register(ctx context.Context, req RegisterRequest) (*entities.User, error) {
	// Check if user already exists
	existingUser, _ := s.userRepo.GetByEmail(ctx, req.Email)
	if existingUser != nil {
		return nil, errors.New("user already exists")
	}

	user := &entities.User{
		Email:    req.Email,
		FullName: req.FullName,
		Role:     entities.RoleRegular,
	}

	if err := user.SetPassword(req.Password); err != nil {
		return nil, err
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}
