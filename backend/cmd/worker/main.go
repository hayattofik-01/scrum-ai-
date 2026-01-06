package main

import (
	"context"
	"log"
	"os/signal"
	"syscall"

	"github.com/hayat/scrumai/internal/application/analysis"
	"github.com/hayat/scrumai/internal/config"
	"github.com/hayat/scrumai/internal/infrastructure/ai"
	"github.com/hayat/scrumai/internal/infrastructure/database"
	"github.com/hayat/scrumai/internal/infrastructure/messaging"
	"github.com/hayat/scrumai/internal/infrastructure/repositories"
	messagingHandlers "github.com/hayat/scrumai/internal/interfaces/messaging"
)

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize database
	client, db := database.NewMongoDBConn(cfg)
	defer client.Disconnect(context.Background())

	// Initialize RabbitMQ
	_, rmqChannel := messaging.NewRabbitMQConn(cfg)

	// Initialize repositories
	standupRepo := repositories.NewStandupRepository(db)
	rollingTaskRepo := repositories.NewRollingTaskRepository(db)
	reportRepo := repositories.NewReportRepository(db)

	// Initialize services
	aiService := ai.NewOpenAIService(cfg)
	analysisService := analysis.NewAnalysisService(standupRepo, rollingTaskRepo, reportRepo, aiService)

	// Initialize worker handler
	worker := messagingHandlers.NewWorkerHandler(rmqChannel, analysisService)

	// Create context that listens for the interrupt signal from the OS.
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// Start worker
	if err := worker.Start(ctx); err != nil {
		log.Fatalf("Worker failed: %v", err)
	}

	log.Println("Worker exiting")
}
