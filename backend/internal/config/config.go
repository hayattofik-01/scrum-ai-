package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Port               string
	Environment        string
	MongoURI           string
	MongoDBName        string
	RedisHost          string
	RedisPort          string
	RedisPassword      string
	RedisDB            int
	RabbitMQURL        string
	JWTSecret          string
	JWTExpHours        int
	CORSAllowedOrigins string
	OpenAIKey          string
	OpenAIModel        string
	GeminiKey          string
	AIProvider         string
	HuggingFaceKey     string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, reading from environment variables")
	}

	return &Config{
		Port:               getEnv("PORT", "8080"),
		Environment:        getEnv("ENVIRONMENT", "development"),
		MongoURI:           getEnv("MONGO_URI", "mongodb://localhost:27017"),
		MongoDBName:        getEnv("MONGO_DB_NAME", "scrumai_db"),
		RedisHost:          getEnv("REDIS_HOST", "localhost"),
		RedisPort:          getEnv("REDIS_PORT", "6379"),
		RedisPassword:      getEnv("REDIS_PASSWORD", ""),
		RedisDB:            getEnvAsInt("REDIS_DB", 0),
		RabbitMQURL:        getEnv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/"),
		JWTSecret:          getEnv("JWT_SECRET", "your-secret-key"),
		JWTExpHours:        getEnvAsInt("JWT_EXPIRATION_HOURS", 24),
		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:5173"),
		OpenAIKey:          getEnv("OPENAI_API_KEY", ""),
		OpenAIModel:        getEnv("OPENAI_MODEL", "gpt-4o"),
		GeminiKey:          getEnv("GEMINI_API_KEY", ""),
		AIProvider:         getEnv("AI_PROVIDER", "mock"),
		HuggingFaceKey:     getEnv("HUGGINGFACE_API_KEY", ""),
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func getEnvAsInt(name string, defaultVal int) int {
	valueStr := getEnv(name, "")
	if value, err := strconv.Atoi(valueStr); err == nil {
		return value
	}
	return defaultVal
}
