# Jolly Rewards Engine

A simple and extensible rewards rule engine that processes employee events and awards points when active rules are matched.

## Goal

Allow managers to define dynamic rules in JSON format so the system can:

- process events in batches;
- evaluate configurable conditions;
- create reward grants;
- update employee point balances;
- keep event processing idempotent.

## Stack

- `Node.js`
- `TypeScript`
- `Express`
- `dotenv`
- `node:test` (happy-path test)

## Project structure

- `src/server.ts`: HTTP layer (routes and basic validation)
- `src/engine/rewardProcessor.ts`: event processing and rule application
- `src/engine/evaluteCondition.ts`: condition evaluator with dot-notation support
- `src/store.ts`: in-memory storage
- `tests/rewardProcessor.test.js`: happy-path test

## Environment variables

Create a `.env` file at the project root:

```env
PORT=3000
```

The server uses `process.env.PORT` with fallback to `3000`.

## Run locally

```bash
npm install
npm run dev
```

API available at `http://localhost:3000`.

## Tests

```bash
npm test
```

The current test covers the happy path: active rule + matching event + balance update.

## Postman

You can also test the API using the Postman files included in the project root:

- `Jolly Rewards Engine.postman_collection.json`
- `Jolly Rewards Engine.postman_environment.json`

Import both files into Postman, select the `Jolly Rewards Engine - Local` environment, and run the requests in order.

## API

### `POST /rules`

Creates a rule.

Example payload:

```json
{
  "name": "Correct clock-in method",
  "eventType": "clock_in",
  "active": true,
  "points": 10,
  "condition": {
    "field": "metadata.correct_method",
    "operator": "==",
    "value": true
  }
}
```

### `GET /rules`

Lists all registered rules.

### `PUT /rules/:name`

Updates a rule by name.

### `POST /events`

Receives an array of events and processes rewards.

Example payload:

```json
[
  {
    "id": "evt-1",
    "employeeId": "emp-1",
    "type": "clock_in",
    "timestamp": "2026-03-04T12:00:00.000Z",
    "metadata": {
      "correct_method": true
    }
  }
]
```

### `GET /employees`

Returns employees and point balances.

## Demo flow (cURL)

1. Create a rule:

```bash
curl -X POST http://localhost:3000/rules \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Correct clock-in method",
    "eventType": "clock_in",
    "active": true,
    "points": 10,
    "condition": {
      "field": "metadata.correct_method",
      "operator": "==",
      "value": true
    }
  }'
```

1. Ingest events:

```bash
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '[
    {
      "id": "evt-1",
      "employeeId": "emp-1",
      "type": "clock_in",
      "timestamp": "2026-03-04T12:00:00.000Z",
      "metadata": {
        "correct_method": true
      }
    }
  ]'
```

1. Check updated balances:

```bash
curl http://localhost:3000/employees
```

1. List rules:

```bash
curl http://localhost:3000/rules
```

## Technical decisions

- In-memory storage to keep the solution small and easy to review.
- Idempotency based on `event.id`.
- Rule filtering by `eventType`.
- Nested condition support using dot-notation (`metadata.x.y`).
- Automatic employee creation when an event grants points and the `employeeId` does not exist yet.

## Suggested next steps

- Persist data in a database (e.g., PostgreSQL).
- Add stronger payload schema validation (e.g., Zod).
- Add more test scenarios (negative cases and idempotency coverage).
- Evolve rule updates to use `id` instead of `name`.
