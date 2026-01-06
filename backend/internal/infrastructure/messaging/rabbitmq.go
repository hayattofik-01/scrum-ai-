package messaging

import (
	"log"

	"github.com/hayat/scrumai/internal/config"
	"github.com/streadway/amqp"
)

func NewRabbitMQConn(cfg *config.Config) (*amqp.Connection, *amqp.Channel) {
	conn, err := amqp.Dial(cfg.RabbitMQURL)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %v", err)
	}

	// Declare exchange
	err = ch.ExchangeDeclare(
		"standup_analysis", // name
		"direct",           // type
		true,               // durable
		false,              // auto-deleted
		false,              // internal
		false,              // no-wait
		nil,                // arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare an exchange: %v", err)
	}

	return conn, ch
}
