# ScrumAI: Distributed AI-Assisted Scrum Management

ScrumAI is a high-performance distributed system designed to revolutionize daily standups and sprint tracking. It transforms raw meeting transcripts into structured, actionable data using advanced AI analysis.

## ✨ Features

- **Distributed Architecture**: Clean, hexagonal architecture with an independent Go API, Background Worker, RabbitMQ, MongoDB, and Redis.
- **AI-Driven Insights**: Synchronous extraction of completed tasks, planned work, and blockers from standup transcripts.
- **Multitenancy & Teams**: Create multiple teams and manage memberships within your organization.
- **Admin Console**: Full user management system with email-based role elevation.
- **Bootstrapping**: The first user to register automatically becomes the System Admin.
- **Real-Time Dashboard**: Auto-refreshing metrics (30s interval) for live project health monitoring.
- **Containerized Development**: Full-stack orchestration via Docker Compose.

## 🚀 Quick Start

### Option 1: Docker (Recommended)
The fastest way to run the entire stack (Frontend, API, Worker, DBs) is using Docker Compose:

```bash
docker compose up --build
```

### Option 2: Manual (Without Docker)
If you don't have Docker installed, follow these steps to run the services individually.

#### 1. Prerequisites
- **Go 1.21+** (for Backend)
- **Node.js 18+** & **npm** (for Frontend)
- **MongoDB** (Running on port 27017)
- **Redis** (Running on port 6379)
- **RabbitMQ** (Running on port 5672)

#### 2. Running the Backend
```bash
cd backend
# Run API (Port 8081)
go run cmd/api/main.go

# Run Worker (In a separate terminal)
go run cmd/worker/main.go
```

#### 3. Running the Frontend
```bash
cd frontend
# Install dependencies
npm install

# Start development server (Port 5173)
npm run dev
```

## 📂 Project Structure

- **`/frontend`**: React + Vite application (UI, components, pages).
- **`/backend`**: Go implementation (API, Worker, business logic).
- **`docker-compose.yml`**: Common orchestration for the entire stack.

The application will be available at:
- **Frontend**: `http://localhost:5173`
- **API Swagger**: `http://localhost:8081/swagger/index.html`

## 🛠 Technology Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Shadcn UI.
- **Backend**: Go (Golang), Gin Gonic.
- **AI**: Configurable providers (OpenAI, Gemini, Hugging Face, LLM7).
- **Messaging**: RabbitMQ.
- **Database**: MongoDB (Persistence), Redis (Sessions).

## 📖 Documentation

For detailed technical insights and project reporting, refer to:
- [Detailed Project Report](backend/docs/submission/1_Detailed_Report.md)
- [Technical Documentation](backend/docs/submission/2_Technical_Documentation.md)
- [Backend Development Guide](backend/README.md)

---

Built with ❤️ by the ScrumAI Team.
