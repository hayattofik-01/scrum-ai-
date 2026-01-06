# ScrumAI Backend

This is the GoLang backend for ScrumAI, built following clean architecture principles.

## Features

- **Clean Architecture**: Separation of concerns into Domain, Application, Infrastructure, and Interface layers.
- **Authentication**: JWT-based authentication with bcrypt password hashing.
- **Session Management**: Explicit session control using Redis for token invalidation and logout.
- **Role-Based Access Control (RBAC)**: Admin and Regular User roles.
- **Async Analysis**: Background standup analysis (rolling tasks, blockers) using RabbitMQ and GPT-4o.
- **Database**: MongoDB for flexible, document-based storage.
- **OpenAI Integration**: Automated insights generation using GPT-4o.
- **Containerization**: Docker and Docker Compose support.

## Prerequisites

- Go 1.21+
- Docker & Docker Compose
- MongoDB (if running locally)
- Redis (if running locally)
- RabbitMQ (if running locally)
- OpenAI API Key

## Getting Started

### 1. Environment Configuration

Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env
```

I have already created a `.env` file for you with the OpenAI key you provided!

### 2. Running with Docker (Recommended)

The easiest way to run the entire stack (API, Worker, MongoDB, Redis, RabbitMQ) is using Docker Compose:

```bash
docker-compose up --build
```

- API Server: `http://localhost:8080`
- RabbitMQ Management: `http://localhost:15672` (guest/guest)

### 3. Running Locally

If you have the dependencies running, you can start the API and Worker separately:

```bash
# Start API
go run cmd/api/main.go

# Start Worker
go run cmd/worker/main.go
```

### 4. Check Dependencies (New)

Before running the backend manually, you can use our diagnostic script to ensure all services (MongoDB, Redis, RabbitMQ) are reachable:

```bash
chmod +x scripts/doctor.sh
./scripts/doctor.sh
```

### 5. Running Tests

To run the unit tests for the core packages:

```bash
go test ./pkg/...
```

## API Documentation & Endpoints

The API is fully documented with Swagger and follows RESTful principles.

### Interactive Documentation
- **Swagger UI**: `http://localhost:8080/swagger/index.html`

### Endpoints List

#### Authentication
- `POST /api/v1/auth/register` - Create a new account
- `POST /api/v1/auth/login` - Sign in and receive JWT
- `POST /api/v1/auth/logout` - Invalidate session (requires JWT)

#### Standups & Analysis
- `POST /api/v1/standups` - Submit daily standup. Triggers async AI analysis.
- `GET /api/v1/standups` - List your recent standups
- `GET /api/v1/standups/:id` - Get details of a specific standup and its analysis

#### Reports & Insights
- `GET /api/v1/reports/rolling-tasks` - Get AI-generated summary of ongoing tasks
- `GET /api/v1/reports/blockers` - View identified team blockers

#### Team Management
- `POST /api/v1/teams` - Create a team
- `GET /api/v1/teams/:id` - Get team details
- `POST /api/v1/teams/:id/join` - Join an existing team

#### Admin
- `GET /api/v1/admin/users` - List all system users (Admin only)

## Demo Flow

To see the system in action:

1. **Register & Login**: Use the `/auth/register` and `/auth/login` endpoints to get your JWT token.
2. **Submit a Standup**: Send a `POST` to `/api/v1/standups` with a message like: *"Finished the dashboard UI. I am blocked by the backend API for the user profile data."*
3. **Background Analysis**: The API will return immediately. In the background, the Worker picks up the task and uses GPT-4o to analyze the text.
4. **Check Reports**: After a few seconds, call `GET /api/v1/reports/blockers`. You should see the blockages identified by the AI automatically extracted from your standup.

## Troubleshooting

### "Connection Refused" / "Context Deadline Exceeded"
If you see errors related to MongoDB or Redis connection:
1. **Use Docker**: Run `docker-compose up --build` – this is the most reliable way to start the system as it handles all dependencies automatically.
2. **Local Services**: If running locally, ensure the services are started:
   - MongoDB: `brew services start mongodb-community@7.0`
   - Redis: `brew services start redis`
   - RabbitMQ: `brew services start rabbitmq`
3. **Run Doctor**: Use `./scripts/doctor.sh` to see exactly which service is missing.

## Project Structure

- `cmd/`: Entry points for API and Worker applications.
- `internal/`: Private application and library code.
- `domain/`: Core business logic (entities, repository interfaces, AI service interface).
- `application/`: Application logic and use cases.
- `infrastructure/`: Implementations of repository interfaces (MongoDB, Cache, Messaging, OpenAI).
- `interfaces/`: HTTP handlers and RabbitMQ consumers.
- `pkg/`: Shared utility packages (JWT, Hash, Logger).
- `docker/`: Dockerfiles for various services.

## License

MIT
