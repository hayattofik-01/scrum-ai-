package auth

import (
	"context"
	"errors"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/pkg/jwt"
)

func (s *authService) Login(ctx context.Context, email, password string) (string, *entities.User, error) {
	user, err := s.userRepo.GetByEmail(ctx, email)
	if err != nil {
		return "", nil, errors.New("invalid credentials")
	}

	if !user.CheckPassword(password) {
		return "", nil, errors.New("invalid credentials")
	}

	token, err := jwt.GenerateToken(user.ID, user.Role, s.jwtSecret, s.jwtExp)
	if err != nil {
		return "", nil, err
	}

	// Create session in Redis
	exp := time.Duration(s.jwtExp) * time.Hour
	if err := s.sessionService.CreateSession(ctx, user.ID, token, exp); err != nil {
		log.Printf("Failed to create session in Redis: %v", err)
		// We could decide to fail the login or just log. For strict session management, we fail.
		return "", nil, errors.New("failed to start session")
	}

	return token, user, nil
}

func (s *authService) Logout(ctx context.Context, userID uuid.UUID) error {
	return s.sessionService.DeleteSession(ctx, userID)
}
