package jwt

import (
	"testing"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
)

func TestTokenGenerationAndValidation(t *testing.T) {
	secret := "test-secret"
	userID := uuid.New()
	role := entities.RoleRegular
	expHours := 1

	token, err := GenerateToken(userID, role, secret, expHours)
	if err != nil {
		t.Fatalf("Failed to generate token: %v", err)
	}

	claims, err := ValidateToken(token, secret)
	if err != nil {
		t.Fatalf("Failed to validate token: %v", err)
	}

	if claims.UserID != userID {
		t.Errorf("Expected userID %v, got %v", userID, claims.UserID)
	}

	if claims.Role != role {
		t.Errorf("Expected role %v, got %v", role, claims.Role)
	}
}

func TestInvalidToken(t *testing.T) {
	secret := "test-secret"
	token := "invalid-token"

	_, err := ValidateToken(token, secret)
	if err == nil {
		t.Error("Expected error for invalid token, got nil")
	}
}
