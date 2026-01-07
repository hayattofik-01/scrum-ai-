package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/hayat/scrumai/internal/application/analysis"
	"github.com/hayat/scrumai/internal/application/auth"
	"github.com/hayat/scrumai/internal/application/standup"
	"github.com/hayat/scrumai/internal/application/user"
	"github.com/hayat/scrumai/internal/config"
	"github.com/hayat/scrumai/internal/domain/services"   // Added
	"github.com/hayat/scrumai/internal/infrastructure/ai" // Added
	"github.com/hayat/scrumai/internal/infrastructure/cache"
	"github.com/hayat/scrumai/internal/infrastructure/database"
	"github.com/hayat/scrumai/internal/infrastructure/messaging"
	"github.com/hayat/scrumai/internal/infrastructure/repositories"
	router "github.com/hayat/scrumai/internal/interfaces/http"
)

// @title           ScrumAI API
// @version         1.0
// @description     This is a Scrum AI backend server.
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8081
// @BasePath  /api/v1

// @securityDefinitions.apikey  ApiKeyAuth
// @in                          header
// @name                        Authorization
// @description                 Type "Bearer" followed by a space and then your token. Example: "Bearer eyJhbGci..."

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Initialize database
	client, db := database.NewMongoDBConn(cfg)
	defer client.Disconnect(context.Background())

	// Initialize Redis
	redisClient := cache.NewRedisClient(cfg)

	// Initialize repositories
	userRepo := repositories.NewUserRepository(db)
	standupRepo := repositories.NewStandupRepository(db)
	rollingTaskRepo := repositories.NewRollingTaskRepository(db)
	reportRepo := repositories.NewReportRepository(db)
	teamRepo := repositories.NewTeamRepository(db)

	// Initialize messaging
	_, rmqChannel := messaging.NewRabbitMQConn(cfg)
	analysisPublisher := messaging.NewAnalysisPublisher(rmqChannel)

	// Initialize services
	var aiService services.AIService
	var err error

	switch cfg.AIProvider {
	case "gemini":
		aiService, err = ai.NewGeminiService(context.Background(), cfg)
		if err != nil {
			log.Fatalf("Failed to initialize Gemini service: %v", err)
		}
	case "huggingface":
		log.Println("Using Hugging Face AI Service")
		aiService = ai.NewHuggingFaceService(cfg)
	case "freellm":
		log.Println("Using Free Anonymous AI Service (LLM7.io)")
		aiService = ai.NewFreeLLMService(cfg)
	case "mock":
		log.Println("Using Mock AI Service")
		aiService = ai.NewMockService()
	default: // defaults to openai
		aiService = ai.NewOpenAIService(cfg)
	}

	analysisService := analysis.NewAnalysisService(standupRepo, rollingTaskRepo, reportRepo, aiService)
	sessionService := auth.NewSessionService(redisClient)
	authService := auth.NewAuthService(userRepo, sessionService, cfg.JWTSecret, cfg.JWTExpHours)
	standupService := standup.NewStandupService(standupRepo, analysisPublisher, analysisService)
	reportService := analysis.NewReportService(rollingTaskRepo, reportRepo)
	teamService := user.NewTeamService(teamRepo, userRepo)
	userService := user.NewUserService(userRepo)

	// Initialize router
	r := router.NewRouter(cfg, authService, standupService, reportService, teamService, userService, sessionService)

	// Start server
	srv := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: r,
	}

	go func() {
		log.Printf("Starting server on port %s", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 5 seconds.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exiting")
}
