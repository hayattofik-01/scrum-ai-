# ScrumAI: A Distributed System for AI-Assisted Scrum Management

## 1. Introduction + Idea + Originality
**ScrumAI** is a distributed system designed to revolutionize daily standups and sprint tracking. Traditional scrum tools rely on manual updates which are often forgotten or lacked depth. 

**The Idea**: Users submit their daily standups in plain text. A distributed worker processes these standups using Large Language Models (GPT-4o) to automatically extract:
- **Rolling Tasks**: Tasks that are moving from one state to another.
- **Blockers**: Identifying dependencies or issues that stop progress.
- **Sentiment/Progress**: Providing a high-level overview of team health.

**Originality**: Unlike static Jira boards, ScrumAI uses an **asynchronous, event-driven architecture** to provide active insights, transforming raw text into actionable data without blocking the user interface.

## 2. Architecture and Design
The system follows **Clean Architecture** and is composed of several independent services.

### Architecture Description
- **API Server**: Handles authentication, standup submission, and report retrieval.
- **Background Worker**: Processes heavy AI analysis tasks asynchronously.
- **Message Broker (RabbitMQ)**: Decouples the API from the Worker, ensuring the API stays responsive.
- **Databases**: MongoDB for persistent document storage and Redis for high-speed session management.

### Diagram
```mermaid
graph TD
    Client[Web/Mobile Client] -- HTTP REST --> API[Go API Server]
    API -- Read/Write --> Mongo[(MongoDB)]
    API -- Session/Cache --> Redis[(Redis)]
    API -- Publish Event --> Rabbit[RabbitMQ]
    Rabbit -- Consume Event --> Worker[Go Background Worker]
    Worker -- AI Analysis --> OpenAI[GPT-4o API]
    Worker -- Save Analysis --> Mongo
```

## 3. Technologies Used
- **Backend**: Go (Golang) for high performance and concurrency.
- **API Framework**: Gin Gonic.
- **Database**: MongoDB (NoSQL) for flexible schema.
- **Caching/Sessions**: Redis.
- **Messaging**: RabbitMQ (AMQP).
- **AI**: OpenAI GPT-4o.
- **Security**: JWT (JSON Web Tokens) + Bcrypt.
- **Containerization**: Docker & Docker Compose.

## 4. API Design
The API follows RESTful principles and is versioned under `/api/v1`. Key modules include:
- **Auth**: Secure session management.
- **Standups**: CRUD operations for daily updates.
- **Reports**: AI-generated insights and blockers.

## 5. Distributed Systems Concepts
| Course Topic | Project Implementation |
| :--- | :--- |
| **Distributed Systems** | Multi-node architecture (API, Worker, DBs). |
| **Client-Server** | RESTful interaction between clients and Go API. |
| **Layered Architecture** | Clean Architecture (Domain, App, Infra, Interface). |
| **Communication** | Sync (HTTP) and Async (AMQP/RabbitMQ). |
| **Concurrency** | Heavy use of Goroutines for non-blocking I/O. |
| **Statelessness** | API is stateless; state is externalized to Redis/Mongo. |
| **Fault Tolerance** | Queue-based persistence ensures tasks aren't lost if workers fail. |
| **Scalability** | Horizontal scaling enabled via Docker. |

## 6. Use Case Walkthrough
1. **Submit**: A developer submits a standup: *"Finished the login UI but stuck on the API integration because the auth service is down."*
2. **Queue**: The API saves the raw text and pushes a `StandupSubmitted` event to RabbitMQ.
3. **Analyze**: The Worker picks up the message, sends it to GPT-4o, and identifies a **Blocker** (Auth service down).
4. **Insight**: The Scrum Master opens the `Blockers` report and immediately sees the identified bottleneck without reading through 20 messages.

## 7. Conclusion and Future Work
ScrumAI successfully demonstrates how a distributed system can handle intensive AI processing while remaining responsive and reliable.

**Future Work**:
- **WebSocket Integration**: Real-time ticker for analysis updates.
- **Service Mesh**: Using Istio for better observability.
- **Distributed Tracing**: Implementing OpenTelemetry to track requests across services.
