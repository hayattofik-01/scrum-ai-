package http

import (
	"github.com/gin-gonic/gin"
	"github.com/hayat/scrumai/internal/application/analysis"
	"github.com/hayat/scrumai/internal/application/auth"
	"github.com/hayat/scrumai/internal/application/standup"
	"github.com/hayat/scrumai/internal/application/user"
	"github.com/hayat/scrumai/internal/config"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/interfaces/http/handlers"
	"github.com/hayat/scrumai/internal/interfaces/http/middleware"

	_ "github.com/hayat/scrumai/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func NewRouter(cfg *config.Config, authService auth.AuthService, standupService standup.StandupService, reportService analysis.ReportService, teamService user.TeamService, userService user.UserService, sessionService auth.SessionService) *gin.Engine {
	r := gin.Default()

	// CORS configuration
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", cfg.CORSAllowedOrigins)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	authHandler := handlers.NewAuthHandler(authService)
	standupHandler := handlers.NewStandupHandler(standupService)
	reportHandler := handlers.NewReportHandler(reportService)
	teamHandler := handlers.NewTeamHandler(teamService)
	userHandler := handlers.NewUserHandler(userService)

	// Swagger UI
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	v1 := r.Group("/api/v1")
	{
		authGroup := v1.Group("/auth")
		{
			authGroup.POST("/register", authHandler.Register)
			authGroup.POST("/login", authHandler.Login)
		}

		// Protected routes
		protected := v1.Group("/")
		protected.Use(middleware.AuthMiddleware(cfg.JWTSecret, sessionService))
		{
			protected.GET("/me", userHandler.GetMe)
			protected.POST("/auth/logout", authHandler.Logout)

			standupGroup := protected.Group("/standups")
			{
				standupGroup.POST("", standupHandler.Submit)
				standupGroup.GET("", standupHandler.GetTeamStandups)
			}

			reportGroup := protected.Group("/reports")
			{
				reportGroup.GET("/rolling-tasks", reportHandler.GetRollingTasks)
				reportGroup.GET("/team-summary", reportHandler.GetTeamReports)
			}

			teamGroup := protected.Group("/teams")
			{
				teamGroup.POST("", teamHandler.Create)
				teamGroup.GET("", teamHandler.List)
				teamGroup.GET("/:id", teamHandler.Get)
				teamGroup.POST("/:id/members", teamHandler.AddMember)
			}

			// Admin only routes
			adminOnly := protected.Group("/admin")
			adminOnly.Use(middleware.RoleMiddleware(entities.RoleAdmin))
			{
				adminOnly.GET("/users", userHandler.ListAll)
				adminOnly.GET("/users/email/:email", userHandler.GetByEmail)
				adminOnly.PUT("/users/:id", userHandler.Update)
				adminOnly.DELETE("/users/:id", userHandler.Delete)
			}
		}
	}

	return r
}
