package entities

import (
	"time"

	"github.com/google/uuid"
)

type Standup struct {
	ID              uuid.UUID `json:"id" bson:"_id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	UserID          uuid.UUID `json:"user_id" bson:"user_id" gorm:"type:uuid;not null;index"`
	TeamID          uuid.UUID `json:"team_id" bson:"team_id" gorm:"type:uuid;not null;index"`
	Date            time.Time `json:"date" bson:"date" gorm:"type:date;not null;index"`
	CompletedTasks  []string  `json:"completed_tasks" bson:"completed_tasks" gorm:"type:text[]"`
	InProgressTasks []string  `json:"in_progress_tasks" bson:"in_progress_tasks" gorm:"type:text[]"`
	PlannedTasks    []string  `json:"planned_tasks" bson:"planned_tasks" gorm:"type:text[]"`
	Blockers        []string  `json:"blockers" bson:"blockers" gorm:"type:text[]"`
	Notes           string    `json:"notes" bson:"notes" gorm:"type:text"`
	CreatedAt       time.Time `json:"created_at" bson:"created_at" gorm:"default:now()"`
	UpdatedAt       time.Time `json:"updated_at" bson:"updated_at" gorm:"default:now()"`
}
