package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/application/user"
	"github.com/hayat/scrumai/internal/domain/entities"
)

type UserHandler struct {
	userService user.UserService
}

func NewUserHandler(userService user.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

// GetMe godoc
// @Summary      Get current user info
// @Description  Retrieve details of the currently authenticated user
// @Tags         users
// @Produce      json
// @Success      200  {object}  entities.User
// @Failure      404  {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /me [get]
func (h *UserHandler) GetMe(c *gin.Context) {
	userID, _ := c.Get("user_id")
	user, err := h.userService.GetUser(c.Request.Context(), userID.(uuid.UUID))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// ListAll godoc
// @Summary      List all users
// @Description  Retrieve a list of all users (Admin only)
// @Tags         admin
// @Produce      json
// @Success      200  {array}   entities.User
// @Failure      500  {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /admin/users [get]
func (h *UserHandler) ListAll(c *gin.Context) {
	users, err := h.userService.ListUsers(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, users)
}

// Update godoc
// @Summary      Update user
// @Description  Update user details (Admin or self)
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        id       path      string                  true  "User ID (UUID)"
// @Param        request  body      user.UpdateUserRequest  true  "Update details"
// @Success      200      {object}  entities.User
// @Failure      400      {object}  map[string]string
// @Failure      403      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /admin/users/{id} [put]
func (h *UserHandler) Update(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	// Security check: only admin or self can update
	currentUserID, _ := c.Get("user_id")
	currentRole, _ := c.Get("role")
	if currentRole != entities.RoleAdmin && currentUserID != id {
		c.JSON(http.StatusForbidden, gin.H{"error": "insufficient permissions"})
		return
	}

	var req user.UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Only admin can change roles
	if req.Role != "" && currentRole != entities.RoleAdmin {
		req.Role = "" // Ignore role change attempt
	}

	updatedUser, err := h.userService.UpdateUser(c.Request.Context(), id, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedUser)
}

// Delete godoc
// @Summary      Delete user
// @Description  Delete a user by ID (Admin only)
// @Tags         admin
// @Param        id   path      string  true  "User ID (UUID)"
// @Success      204  {object}  nil
// @Failure      400  {object}  map[string]string
// @Failure      500  {object}  map[string]string
// @Security     ApiKeyAuth
// @Router       /admin/users/{id} [delete]
func (h *UserHandler) Delete(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	if err := h.userService.DeleteUser(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
