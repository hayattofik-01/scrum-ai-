package entities

import (
	"time"

	"github.com/google/uuid"
)

type Team struct {
	ID          uuid.UUID `json:"id" bson:"_id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name        string    `json:"name" bson:"name" gorm:"not null"`
	Description string    `json:"description" bson:"description"`
	CreatedBy   uuid.UUID `json:"created_by" bson:"created_by" gorm:"type:uuid"`
	CreatedAt   time.Time `json:"created_at" bson:"created_at" gorm:"default:now()"`
	UpdatedAt   time.Time `json:"updated_at" bson:"updated_at" gorm:"default:now()"`
	Members     []User    `json:"members,omitempty" bson:"members,omitempty" gorm:"foreignKey:TeamID"`
}
