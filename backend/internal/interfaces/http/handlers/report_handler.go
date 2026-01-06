package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/application/analysis"
)

type ReportHandler struct {
	reportService analysis.ReportService
}

func NewReportHandler(reportService analysis.ReportService) *ReportHandler {
	return &ReportHandler{reportService: reportService}
}

// GetRollingTasks godoc
// @Summary      Get team rolling tasks
// @Description  Retrieve tasks that have been in progress for multiple standups
// @Tags         reports
// @Produce      json
// @Param        team_id  query     string  true  "Team ID (UUID)"
// @Success      200      {array}   entities.RollingTask
// @Failure      400      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /reports/rolling-tasks [get]
func (h *ReportHandler) GetRollingTasks(c *gin.Context) {
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

	tasks, err := h.reportService.GetRollingTasks(c.Request.Context(), teamID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, tasks)
}

// GetTeamReports godoc
// @Summary      Get team summary reports
// @Description  Retrieve AI generated team summary reports
// @Tags         reports
// @Produce      json
// @Param        team_id  query     string  true  "Team ID (UUID)"
// @Success      200      {array}   entities.Report
// @Failure      400      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /reports/team-summary [get]
func (h *ReportHandler) GetTeamReports(c *gin.Context) {
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

	reports, err := h.reportService.GetTeamReports(c.Request.Context(), teamID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, reports)
}
