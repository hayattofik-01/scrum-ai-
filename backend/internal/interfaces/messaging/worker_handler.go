package messaging

import (
	"context"
	"encoding/json"
	"log"

	"github.com/hayat/scrumai/internal/application/analysis"
	"github.com/hayat/scrumai/internal/infrastructure/messaging"
	"github.com/streadway/amqp"
)

type WorkerHandler struct {
	channel         *amqp.Channel
	analysisService analysis.AnalysisService
}

func NewWorkerHandler(ch *amqp.Channel, analysisService analysis.AnalysisService) *WorkerHandler {
	return &WorkerHandler{
		channel:         ch,
		analysisService: analysisService,
	}
}

func (h *WorkerHandler) Start(ctx context.Context) error {
	q, err := h.channel.QueueDeclare(
		"standup_analysis_queue", // name
		true,                     // durable
		false,                    // delete when unused
		false,                    // exclusive
		false,                    // no-wait
		nil,                      // arguments
	)
	if err != nil {
		return err
	}

	err = h.channel.QueueBind(
		q.Name,             // queue name
		"",                 // routing key
		"standup_analysis", // exchange
		false,
		nil,
	)
	if err != nil {
		return err
	}

	msgs, err := h.channel.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	if err != nil {
		return err
	}

	go func() {
		for d := range msgs {
			var msg messaging.StandupAnalysisMessage
			if err := json.Unmarshal(d.Body, &msg); err != nil {
				log.Printf("Error unmarshaling analysis message: %v", err)
				d.Nack(false, false)
				continue
			}

			log.Printf("Received analysis message for standup: %s", msg.StandupID)
			
			if err := h.analysisService.AnalyzeStandup(ctx, msg.StandupID); err != nil {
				log.Printf("Error analyzing standup: %v", err)
				d.Nack(false, true) // Requeue on error
			} else {
				d.Ack(false)
			}
		}
	}()

	log.Printf("Worker started, waiting for messages...")
	<-ctx.Done()
	return nil
}
