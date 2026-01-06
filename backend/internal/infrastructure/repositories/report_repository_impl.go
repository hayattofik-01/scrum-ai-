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

type reportRepo struct {
	collection *mongo.Collection
}

func NewReportRepository(db *mongo.Database) repositories.ReportRepository {
	return &reportRepo{
		collection: db.Collection("reports"),
	}
}

func (r *reportRepo) Create(ctx context.Context, report *entities.Report) error {
	if report.ID == uuid.Nil {
		report.ID = uuid.New()
	}
	if report.CreatedAt.IsZero() {
		report.CreatedAt = time.Now()
	}
	_, err := r.collection.InsertOne(ctx, report)
	return err
}

func (r *reportRepo) GetByTeamID(ctx context.Context, teamID uuid.UUID) ([]entities.Report, error) {
	opts := options.Find().SetSort(bson.D{{Key: "created_at", Value: -1}})
	cursor, err := r.collection.Find(ctx, bson.M{"team_id": teamID}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var reports []entities.Report
	if err = cursor.All(ctx, &reports); err != nil {
		return nil, err
	}
	return reports, nil
}

func (r *reportRepo) GetByID(ctx context.Context, id uuid.UUID) (*entities.Report, error) {
	var report entities.Report
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&report)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &report, nil
}
