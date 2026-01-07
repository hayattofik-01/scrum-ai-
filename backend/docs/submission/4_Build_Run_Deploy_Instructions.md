# ScrumAI – Build, Run, and Deployment Instructions

## 1. Requirements
Before starting, ensure you have the following installed:
* **Docker & Docker Compose** (Recommended for easiest setup)
* **Go 1.21+** (For local development)
* **Node.js 18+** (For the frontend)

## 2. Environment Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your **AI Provider** details:
   - `AI_PROVIDER`: Choose from `freellm` (default, anonymous LLM7), `openai`, `gemini`, or `huggingface`.
   - Provide the corresponding API key (e.g., `OPENAI_API_KEY`) if using a non-default provider.

## 3. Build and Run (Docker)
The entire distributed stack can be started with a single command:
```bash
docker-compose up --build
```
**This command initializes:**
* API Server
* Worker Service
* MongoDB (Port 27017)
* Redis (Port 6379)
* RabbitMQ (Port 5672, Management UI 15672)

> [!IMPORTANT]
> **Recommended Method**: Use Docker Compose to avoid "Connection Refused" errors. It ensures all databases and queues are ready before the Go services start.

## 4. Local Execution (Development Mode)
If you prefer to run services individually:

### Step 1: Start Infrastructure
Start your local MongoDB, Redis, and RabbitMQ instances.

### Step 2: Run Backend Services
```bash
# In one terminal:
go run cmd/api/main.go

# In another terminal:
go run cmd/worker/main.go
```

### Step 3: Run Frontend
```bash
cd frontend
npm install
npm run dev
```

## 5. Running Tests
To execute the automated unit test suite:
```bash
cd backend
go test ./pkg/...
```

## 6. Deployment & Scaling
* **Horizontal Scaling:** Because the API and Worker are stateless, you can scale them by adding more instances:
  ```bash
  docker-compose up --scale worker=3
  ```
* **Production Build:** Use the provided Dockerfiles for optimized production images.

## 7. Troubleshooting
If you encounter a `Connection Refused` error when running the backend manually:
1. Run the diagnostic tool: `./scripts/doctor.sh`
2. Ensure MongoDB, Redis, and RabbitMQ are running on their default ports.
3. Switch to the Docker method: `docker-compose up --build`
