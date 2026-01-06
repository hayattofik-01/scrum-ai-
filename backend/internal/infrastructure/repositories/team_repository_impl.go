package repositories

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type teamRepo struct {
	collection *mongo.Collection
}

func NewTeamRepository(db *mongo.Database) repositories.TeamRepository {
	return &teamRepo{
		collection: db.Collection("teams"),
	}
}

func (r *teamRepo) Create(ctx context.Context, team *entities.Team) error {
	if team.ID == uuid.Nil {
		team.ID = uuid.New()
	}
	if team.CreatedAt.IsZero() {
		team.CreatedAt = time.Now()
	}
	if team.UpdatedAt.IsZero() {
		team.UpdatedAt = time.Now()
	}
	_, err := r.collection.InsertOne(ctx, team)
	return err
}

func (r *teamRepo) GetByID(ctx context.Context, id uuid.UUID) (*entities.Team, error) {
	var team entities.Team
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&team)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &team, nil
}

func (r *teamRepo) List(ctx context.Context) ([]entities.Team, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var teams []entities.Team
	if err = cursor.All(ctx, &teams); err != nil {
		return nil, err
	}
	return teams, nil
}

func (r *teamRepo) Update(ctx context.Context, team *entities.Team) error {
	team.UpdatedAt = time.Now()
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": team.ID}, team)
	return err
}

func (r *teamRepo) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}
