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
// @Summary      Submit a daily standup with transcript
// @Description  Create a new standup entry by uploading a transcript file
// @Tags         standups
// @Accept       multipart/form-data
// @Produce      json
// @Param        transcript     formData  file    true  "Transcript file"
// @Param        team_id        formData  string  true  "Team ID (UUID)"
// @Param        date           formData  string  false "Date (RFC3339)"
// @Param        notes          formData  string  false "Notes"
// @Success      201            {object}  entities.Standup
// @Failure      400            {object}  map[string]string
// @Failure      500            {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /standups [post]
func (h *StandupHandler) Submit(c *gin.Context) {
	// 1. Get User ID from Claims
	userIDInterface, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID := userIDInterface.(uuid.UUID)

	// 2. Parse Multipart Form
	if err := c.Request.ParseMultipartForm(10 << 20); err != nil { // 10 MB limit
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to parse multipart form"})
		return
	}

	// 3. Get Team ID
	teamIDStr := c.Request.FormValue("team_id")
	if teamIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "team_id is required"})
		return
	}
	teamID, err := uuid.Parse(teamIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team_id uuid"})
		return
	}

	// 4. Get Date (Optional, default to Now)
	dateStr := c.Request.FormValue("date")
	standupDate := time.Now()
	if dateStr != "" {
		parsedDate, err := time.Parse(time.RFC3339, dateStr)
		if err == nil {
			standupDate = parsedDate
		}
	}

	// 5. Get Notes
	notes := c.Request.FormValue("notes")

	// 6. Read Transcript File
	file, _, err := c.Request.FormFile("transcript")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "transcript file is required"})
		return
	}
	defer file.Close()

	// Read content into string
	buf := make([]byte, 1024*1024) // 1MB buffer, resize as needed or use io.ReadAll
	n, err := file.Read(buf)
	if err != nil && err.Error() != "EOF" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read transcript file"})
		return
	}
	transcriptContent := string(buf[:n])

	// 7. Create Request Object
	req := standup.SubmitStandupRequest{
		UserID:     userID,
		TeamID:     teamID,
		Date:       standupDate,
		Transcript: transcriptContent,
		Notes:      notes,
	}

	// 8. Call Service
	createdStandup, err := h.standupService.SubmitStandup(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, createdStandup)
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
