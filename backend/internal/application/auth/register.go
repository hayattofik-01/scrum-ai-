package auth

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
	"github.com/hayat/scrumai/pkg/jwt"
)

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	FullName string `json:"full_name" binding:"required"`
}

type AuthService interface {
	Register(ctx context.Context, req RegisterRequest) (string, *entities.User, error)
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

func (s *authService) Register(ctx context.Context, req RegisterRequest) (string, *entities.User, error) {
	// Check if user already exists
	existingUser, _ := s.userRepo.GetByEmail(ctx, req.Email)
	if existingUser != nil {
		return "", nil, errors.New("user already exists")
	}

	// Check if this is the first user in the system
	users, _ := s.userRepo.List(ctx)
	role := entities.RoleRegular
	if len(users) == 0 {
		role = entities.RoleAdmin
	}

	user := &entities.User{
		Email:    req.Email,
		FullName: req.FullName,
		Role:     role,
	}

	if err := user.SetPassword(req.Password); err != nil {
		return "", nil, err
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		return "", nil, err
	}

	// Generate token for auto-login
	token, err := jwt.GenerateToken(user.ID, user.Role, s.jwtSecret, s.jwtExp)
	if err != nil {
		return "", user, nil // User created, but token failed. Client can retry login.
	}

	// Create session in Redis
	exp := time.Duration(s.jwtExp) * time.Hour
	if err := s.sessionService.CreateSession(ctx, user.ID, token, exp); err != nil {
		// Log error but don't fail the registration
		return token, user, nil
	}

	return token, user, nil
}
