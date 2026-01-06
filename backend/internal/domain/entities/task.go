package entities

import (
	"time"

	"github.com/google/uuid"
)

type RollingTaskStatus string

const (
	RollingTaskActive   RollingTaskStatus = "active"
	RollingTaskResolved RollingTaskStatus = "resolved"
)

type RollingTask struct {
	ID              uuid.UUID         `json:"id" bson:"_id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	TeamID          uuid.UUID         `json:"team_id" bson:"team_id" gorm:"type:uuid;not null;index"`
	UserID          uuid.UUID         `json:"user_id" bson:"user_id" gorm:"type:uuid;not null;index"`
	TaskDescription string            `json:"task_description" bson:"task_description" gorm:"type:text;not null"`
	FirstMentioned  time.Time         `json:"first_mentioned" bson:"first_mentioned" gorm:"type:date;not null"`
	LastMentioned   time.Time         `json:"last_mentioned" bson:"last_mentioned" gorm:"type:date;not null"`
	OccurrenceCount int               `json:"occurrence_count" bson:"occurrence_count" gorm:"default:1"`
	Status          RollingTaskStatus `json:"status" bson:"status" gorm:"type:varchar(50);default:'active'"`
	CreatedAt       time.Time         `json:"created_at" bson:"created_at" gorm:"default:now()"`
	UpdatedAt       time.Time         `json:"updated_at" bson:"updated_at" gorm:"default:now()"`
}
