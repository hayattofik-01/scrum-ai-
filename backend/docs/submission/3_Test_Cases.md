# ScrumAI – Test Cases

## 1. Standup Submission
* **Description:** Verify that a user can submit a standup and it is persisted.
* **Input:** Valid text standup via `POST /api/v1/standups`.
* **Expected Result:** HTTP 201 Created; record exists in MongoDB; message published to RabbitMQ.
* **Status:** Pass

## 2. Message Queue Processing
* **Description:** Ensure the background worker correctly consumes messages.
* **Input:** A `StandupSubmitted` message in the RabbitMQ queue.
* **Expected Result:** Worker starts processing; logs indicate message receipt.
* **Status:** Pass

## 3. AI Analysis Output
* **Description:** Validate that blockers are correctly identified from standup text.
* **Input:** Standup message mentioning "stuck on database migration."
* **Expected Result:** Analysis record in MongoDB contains "database migration" as a blocker.
* **Status:** Pass

## 4. API Authentication
* **Description:** Verify that protected endpoints require a valid JWT.
* **Input:** Request to `/api/v1/standups` without `Authorization` header.
* **Expected Result:** HTTP 401 Unauthorized.
* **Status:** Pass

## 5. Fault Tolerance
* **Description:** Test system behavior when the worker service is unavailable.
* **Scenario:** Stop the Worker container and submit a standup.
* **Expected Result:** API returns success; message stays in RabbitMQ until the Worker is restarted.
* **Status:** Pass

## 6. Concurrent Submissions
* **Description:** Ensure the system handles multiple simultaneous requests.
* **Scenario:** 10 concurrent users submitting standups.
* **Expected Result:** All 10 requests succeed; all 10 analysis tasks are queued and processed.
* **Status:** Pass

## 7. Unit Tests
In addition to the manual test cases above, the following unit tests are implemented:
* **JWT Logic:** `pkg/jwt/jwt_test.go`
* **Hashing Logic:** `pkg/hash/hash_test.go`

Run unit tests with:
```bash
go test ./pkg/...
```
