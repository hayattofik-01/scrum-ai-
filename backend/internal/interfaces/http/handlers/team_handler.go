package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/application/user"
)

type TeamHandler struct {
	teamService user.TeamService
}

func NewTeamHandler(teamService user.TeamService) *TeamHandler {
	return &TeamHandler{teamService: teamService}
}

// Create godoc
// @Summary      Create a new team
// @Description  Create a new team with a name
// @Tags         teams
// @Accept       json
// @Produce      json
// @Param        request  body      user.CreateTeamRequest  true  "Team name"
// @Success      201      {object}  entities.Team
// @Failure      400      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /teams [post]
func (h *TeamHandler) Create(c *gin.Context) {
	var req user.CreateTeamRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, _ := c.Get("user_id")
	req.CreatedBy = userID.(uuid.UUID)

	team, err := h.teamService.CreateTeam(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, team)
}

// Get godoc
// @Summary      Get team details
// @Description  Retrieve details of a specific team by ID
// @Tags         teams
// @Produce      json
// @Param        id   path      string  true  "Team ID (UUID)"
// @Success      200  {object}  entities.Team
// @Failure      400  {object}  map[string]string
// @Failure      404  {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /teams/{id} [get]
func (h *TeamHandler) Get(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	team, err := h.teamService.GetTeam(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "team not found"})
		return
	}

	c.JSON(http.StatusOK, team)
}

// List godoc
// @Summary      List all teams
// @Description  Retrieve a list of all teams
// @Tags         teams
// @Produce      json
// @Success      200  {array}   entities.Team
// @Failure      500  {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /teams [get]
func (h *TeamHandler) List(c *gin.Context) {
	teams, err := h.teamService.ListTeams(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, teams)
}

// AddMember godoc
// @Summary      Add member to team
// @Description  Add a user to a specific team
// @Tags         teams
// @Accept       json
// @Produce      json
// @Param        id       path      string  true  "Team ID (UUID)"
// @Param        request  body      object  true  "User ID to add"
// @Success      200      {object}  map[string]string
// @Failure      400      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /teams/{id}/members [post]
func (h *TeamHandler) AddMember(c *gin.Context) {
	teamIDStr := c.Param("id")
	teamID, err := uuid.Parse(teamIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team id"})
		return
	}

	var req struct {
		UserID uuid.UUID `json:"user_id" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.teamService.AddMember(c.Request.Context(), teamID, req.UserID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "member added"})
}
