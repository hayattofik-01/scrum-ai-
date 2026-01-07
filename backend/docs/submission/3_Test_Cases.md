# ScrumAI – Test Cases

## 1. Standup Submission
* **Description:** Verify that a user can submit a standup transcript and receive structured data immediately.
* **Input:** Valid transcript (multipart/form-data) via `POST /api/v1/standups`.
* **Expected Result:** HTTP 201 Created; response JSON contains populated `completed_tasks`, `in_progress_tasks`, etc.; record exists in MongoDB; backup message published to RabbitMQ.
* **Status:** Pass

## 2. Message Queue (Backup processing)
* **Description:** Ensure the background worker correctly consumes the backup analysis messages.
* **Input:** A `StandupAnalysisMessage` in the RabbitMQ queue.
* **Expected Result:** Worker starts processing; logs indicate message receipt for deep analysis/reports.
* **Status:** Pass

## 3. Synchronous AI Output
* **Description:** Validate that blockers are correctly identified and returned in the API response.
* **Input:** Standup transcript mentioning "waiting for API endpoints deployment."
* **Expected Result:** The `POST /api/v1/standups` response JSON contains "new API endpoints deployment" (or similar) in the `blockers` array.
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
