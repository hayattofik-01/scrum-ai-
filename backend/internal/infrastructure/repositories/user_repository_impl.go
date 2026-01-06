package repositories

import (
	"context"

	"github.com/google/uuid"
	"github.com/hayat/scrumai/internal/domain/entities"
	"github.com/hayat/scrumai/internal/domain/repositories"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type userRepo struct {
	collection *mongo.Collection
}

func NewUserRepository(db *mongo.Database) repositories.UserRepository {
	return &userRepo{
		collection: db.Collection("users"),
	}
}

func (r *userRepo) Create(ctx context.Context, user *entities.User) error {
	if user.ID == uuid.Nil {
		user.ID = uuid.New()
	}
	_, err := r.collection.InsertOne(ctx, user)
	return err
}

func (r *userRepo) GetByID(ctx context.Context, id uuid.UUID) (*entities.User, error) {
	var user entities.User
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (r *userRepo) GetByEmail(ctx context.Context, email string) (*entities.User, error) {
	var user entities.User
	err := r.collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (r *userRepo) Update(ctx context.Context, user *entities.User) error {
	_, err := r.collection.ReplaceOne(ctx, bson.M{"_id": user.ID}, user)
	return err
}

func (r *userRepo) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	return err
}

func (r *userRepo) List(ctx context.Context) ([]entities.User, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []entities.User
	if err = cursor.All(ctx, &users); err != nil {
		return nil, err
	}
	return users, nil
}
