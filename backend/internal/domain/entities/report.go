package entities

import (
	"time"

	"github.com/google/uuid"
)

type ReportType string

const (
	ReportTypeRollingTasks ReportType = "rolling_tasks"
	ReportTypeBlockers     ReportType = "blockers"
	ReportTypeTeamSummary  ReportType = "team_summary"
)

type Report struct {
	ID          uuid.UUID   `json:"id" bson:"_id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	TeamID      uuid.UUID   `json:"team_id" bson:"team_id" gorm:"type:uuid;not null;index"`
	ReportType  ReportType  `json:"report_type" bson:"report_type" gorm:"type:varchar(50);not null"`
	DateFrom    time.Time   `json:"date_from" bson:"date_from" gorm:"type:date;not null"`
	DateTo      time.Time   `json:"date_to" bson:"date_to" gorm:"type:date;not null"`
	Data        interface{} `json:"data" bson:"data" gorm:"type:jsonb;not null"`
	GeneratedBy uuid.UUID   `json:"generated_by" bson:"generated_by" gorm:"type:uuid"`
	CreatedAt   time.Time   `json:"created_at" bson:"created_at" gorm:"default:now()"`
}
