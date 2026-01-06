package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/application/standup"
)

type StandupHandler struct {
	standupService standup.StandupService
}

func NewStandupHandler(standupService standup.StandupService) *StandupHandler {
	return &StandupHandler{standupService: standupService}
}

// Submit godoc
// @Summary      Submit a daily standup
// @Description  Create a new standup entry for the user
// @Tags         standups
// @Accept       json
// @Produce      json
// @Param        request  body      standup.SubmitStandupRequest  true  "Standup details"
// @Success      201      {object}  entities.Standup
// @Failure      400      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /standups [post]
func (h *StandupHandler) Submit(c *gin.Context) {
	var req standup.SubmitStandupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Override UserID from context for security
	userID, _ := c.Get("user_id")
	req.UserID = userID.(uuid.UUID)

	standup, err := h.standupService.SubmitStandup(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, standup)
}

// GetTeamStandups godoc
// @Summary      Get team standups
// @Description  Retrieve standups for a specific team within a date range
// @Tags         standups
// @Produce      json
// @Param        team_id    query     string  true   "Team ID (UUID)"
// @Param        date_from  query     string  false  "Start date (RFC3339)"
// @Param        date_to    query     string  false  "End date (RFC3339)"
// @Success      200        {array}   entities.Standup
// @Failure      400        {object}  map[string]string
// @Failure      500        {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /standups [get]
func (h *StandupHandler) GetTeamStandups(c *gin.Context) {
	teamIDStr := c.Query("team_id")
	if teamIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "team_id is required"})
		return
	}

	teamID, err := uuid.Parse(teamIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team_id"})
		return
	}

	dateFromStr := c.Query("date_from")
	dateToStr := c.Query("date_to")

	var dateFrom, dateTo time.Time
	if dateFromStr != "" {
		dateFrom, _ = time.Parse(time.RFC3339, dateFromStr)
	}
	if dateToStr != "" {
		dateTo, _ = time.Parse(time.RFC3339, dateToStr)
	}

	standups, err := h.standupService.GetTeamStandups(c.Request.Context(), teamID, dateFrom, dateTo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, standups)
}
