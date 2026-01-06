package entities

import (
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type UserRole string

const (
	RoleAdmin   UserRole = "admin"
	RoleRegular UserRole = "regular"
)

type User struct {
	ID           uuid.UUID  `json:"id" bson:"_id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Email        string     `json:"email" bson:"email" gorm:"uniqueIndex;not null"`
	PasswordHash string     `json:"-" bson:"password_hash" gorm:"not null"`
	FullName     string     `json:"full_name" bson:"full_name" gorm:"not null"`
	Role         UserRole   `json:"role" bson:"role" gorm:"type:user_role;default:'regular'"`
	TeamID       *uuid.UUID `json:"team_id" bson:"team_id" gorm:"type:uuid"`
	CreatedAt    time.Time  `json:"created_at" bson:"created_at" gorm:"default:now()"`
	UpdatedAt    time.Time  `json:"updated_at" bson:"updated_at" gorm:"default:now()"`
	DeletedAt    *time.Time `json:"deleted_at" bson:"deleted_at,omitempty" gorm:"index"`
}

func (u *User) SetPassword(password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.PasswordHash = string(hash)
	return nil
}

func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password))
	return err == nil
}
