package auth

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
)

type SessionService interface {
	CreateSession(ctx context.Context, userID uuid.UUID, token string, expiresAt time.Duration) error
	IsSessionValid(ctx context.Context, userID uuid.UUID, token string) (bool, error)
	DeleteSession(ctx context.Context, userID uuid.UUID) error
}

type sessionService struct {
	redis *redis.Client
}

func NewSessionService(rdb *redis.Client) SessionService {
	return &sessionService{redis: rdb}
}

func (s *sessionService) CreateSession(ctx context.Context, userID uuid.UUID, token string, expiresAt time.Duration) error {
	key := fmt.Sprintf("session:%s", userID.String())
	return s.redis.Set(ctx, key, token, expiresAt).Err()
}

func (s *sessionService) IsSessionValid(ctx context.Context, userID uuid.UUID, token string) (bool, error) {
	key := fmt.Sprintf("session:%s", userID.String())
	storedToken, err := s.redis.Get(ctx, key).Result()
	if err == redis.Nil {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	return storedToken == token, nil
}

func (s *sessionService) DeleteSession(ctx context.Context, userID uuid.UUID) error {
	key := fmt.Sprintf("session:%s", userID.String())
	return s.redis.Del(ctx, key).Err()
}
