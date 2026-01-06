package messaging

import (
	"encoding/json"
	"log"

	"github.com/google/uuid"
	"github.com/streadway/amqp"
)

type StandupAnalysisMessage struct {
	StandupID uuid.UUID `json:"standup_id"`
	UserID    uuid.UUID `json:"user_id"`
	TeamID    uuid.UUID `json:"team_id"`
}

type AnalysisPublisher struct {
	channel *amqp.Channel
}

func NewAnalysisPublisher(ch *amqp.Channel) *AnalysisPublisher {
	return &AnalysisPublisher{channel: ch}
}

func (p *AnalysisPublisher) PublishAnalysis(msg StandupAnalysisMessage) error {
	body, err := json.Marshal(msg)
	if err != nil {
		return err
	}

	err = p.channel.Publish(
		"standup_analysis", // exchange
		"",                 // routing key
		false,              // mandatory
		false,              // immediate
		amqp.Publishing{
			ContentType: "application/json",
			Body:        body,
		})
	if err != nil {
		log.Printf("Failed to publish analysis message: %v", err)
		return err
	}

	return nil
}
