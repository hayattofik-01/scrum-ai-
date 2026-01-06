package repositories

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type rollingTaskRepo struct {
	collection *mongo.Collection
}

func NewRollingTaskRepository(db *mongo.Database) repositories.RollingTaskRepository {
	return &rollingTaskRepo{
		collection: db.Collection("rolling_tasks"),
	}
}

func (r *rollingTaskRepo) Create(ctx context.Context, rt *entities.RollingTask) error {
	if rt.ID == uuid.Nil {
		rt.ID = uuid.New()
	}
	if rt.CreatedAt.IsZero() {
		rt.CreatedAt = time.Now()
	}
	if rt.UpdatedAt.IsZero() {
		rt.UpdatedAt = time.Now()
	}
	_, err := r.collection.InsertOne(ctx, rt)
	return err
}

func (r *rollingTaskRepo) GetByDescription(ctx context.Context, userID uuid.UUID, description string) (*entities.RollingTask, error) {
	var rt entities.RollingTask
	err := r.collection.FindOne(ctx, bson.M{
		"user_id":          userID,
		"task_description": description,
		"status":           entities.RollingTaskActive,
	}).Decode(&rt)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &rt, nil
}

func (r *rollingTaskRepo) GetActiveByTeamID(ctx context.Context, teamID uuid.UUID) ([]entities.RollingTask, error) {
	opts := options.Find().SetSort(bson.D{{Key: "last_mentioned", Value: -1}})
	cursor, err := r.collection.Find(ctx, bson.M{
		"team_id": teamID,
		"status":  entities.RollingTaskActive,
	}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var tasks []entities.RollingTask
	if err = cursor.All(ctx, &tasks); err != nil {
		return nil, err
	}
	return tasks, nil
}

func (r *rollingTaskRepo) Update(ctx context.Context, rt *entities.RollingTask) error {
	rt.UpdatedAt = time.Now()
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": rt.ID}, rt)
	return err
}

func (r *rollingTaskRepo) GetByID(ctx context.Context, id uuid.UUID) (*entities.RollingTask, error) {
	var rt entities.RollingTask
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&rt)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &rt, nil
}

func (r *rollingTaskRepo) GetActiveByUserID(ctx context.Context, userID uuid.UUID) ([]entities.RollingTask, error) {
	opts := options.Find().SetSort(bson.D{{Key: "last_mentioned", Value: -1}})
	cursor, err := r.collection.Find(ctx, bson.M{
		"user_id": userID,
		"status":  entities.RollingTaskActive,
	}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var tasks []entities.RollingTask
	if err = cursor.All(ctx, &tasks); err != nil {
		return nil, err
	}
	return tasks, nil
}
