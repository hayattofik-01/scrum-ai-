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

type standupRepo struct {
	collection *mongo.Collection
}

func NewStandupRepository(db *mongo.Database) repositories.StandupRepository {
	return &standupRepo{
		collection: db.Collection("standups"),
	}
}

func (r *standupRepo) Create(ctx context.Context, standup *entities.Standup) error {
	if standup.ID == uuid.Nil {
		standup.ID = uuid.New()
	}
	if standup.CreatedAt.IsZero() {
		standup.CreatedAt = time.Now()
	}
	if standup.UpdatedAt.IsZero() {
		standup.UpdatedAt = time.Now()
	}
	_, err := r.collection.InsertOne(ctx, standup)
	return err
}

func (r *standupRepo) GetByID(ctx context.Context, id uuid.UUID) (*entities.Standup, error) {
	var standup entities.Standup
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&standup)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &standup, nil
}

func (r *standupRepo) GetByTeamID(ctx context.Context, teamID uuid.UUID, dateFrom, dateTo time.Time) ([]entities.Standup, error) {
	filter := bson.M{"team_id": teamID}

	dateFilter := bson.M{}
	if !dateFrom.IsZero() {
		dateFilter["$gte"] = dateFrom
	}
	if !dateTo.IsZero() {
		dateFilter["$lte"] = dateTo
	}
	if len(dateFilter) > 0 {
		filter["date"] = dateFilter
	}

	opts := options.Find().SetSort(bson.D{{Key: "date", Value: -1}})
	cursor, err := r.collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var standups []entities.Standup
	if err = cursor.All(ctx, &standups); err != nil {
		return nil, err
	}
	return standups, nil
}

func (r *standupRepo) GetByUserID(ctx context.Context, userID uuid.UUID, dateFrom, dateTo time.Time) ([]entities.Standup, error) {
	filter := bson.M{"user_id": userID}

	dateFilter := bson.M{}
	if !dateFrom.IsZero() {
		dateFilter["$gte"] = dateFrom
	}
	if !dateTo.IsZero() {
		dateFilter["$lte"] = dateTo
	}
	if len(dateFilter) > 0 {
		filter["date"] = dateFilter
	}

	opts := options.Find().SetSort(bson.D{{Key: "date", Value: -1}})
	cursor, err := r.collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var standups []entities.Standup
	if err = cursor.All(ctx, &standups); err != nil {
		return nil, err
	}
	return standups, nil
}

func (r *standupRepo) Update(ctx context.Context, standup *entities.Standup) error {
	standup.UpdatedAt = time.Now()
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": standup.ID}, standup)
	return err
}

func (r *standupRepo) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}
