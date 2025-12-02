# Taskboard Backend

Simple Kanban-style board API built with Node.js and Express.  
It exposes endpoints to fetch the board and create tasks in specific lists.

---

## Features

- `GET /board` – returns the full board (lists + tasks)
- `POST /lists/:listId/tasks` – creates a new task inside a specific list
- `GET /` – health check endpoint (`status: "ok"`)
- In-memory storage (no database): board lives in `src/storage/db.js`
- Basic validation & clear error messages (`400` / `404`)

---

## Tech Stack

- **Node.js** (Express server)
- **Express** for routing
- **uuid** for generating task IDs
- **nodemon** for local development

---

## Getting Started

### Prerequisites

- Node.js
- npm

## Installation

### Clone the repository
git clone https://github.com/arvo101/taskboard-backend.git
cd taskboard-backend

### Install dependencies (Express, uuid, nodemon, etc.)
npm install

### If for some reason uuid is missing, install it explicitly:
npm install uuid

### Run the server
npm run dev

### The API will be available at:
http://localhost:3000


# API Documentation

### Endpoints Summary

| Method | Path                    | Description                              |
|--------|-------------------------|------------------------------------------|
| GET    | `/`                     | Health check                             |
| GET    | `/board`                | Get the full board (lists + tasks)       |
| POST   | `/lists/:listId/tasks`  | Create a new task inside a specific list |

---

### Health Check

**GET** `/`

Use this to verify that the API is running.

**Response 200**

```json
{
  "status": "ok",
  "message": "Taskboard API is running!"
}
```
## Get Board

**Endpoint**

`GET /board`

Returns the current in-memory board including all lists and their tasks.

**Example Response – 200 OK**

    {
      "id": "board1",
      "name": "My Board",
      "lists": [
        {
          "id": "1",
          "name": "To Do",
          "tasks": []
        },
        {
          "id": "2",
          "name": "In Progress",
          "tasks": []
        },
        {
          "id": "3",
          "name": "Done",
          "tasks": []
        }
      ]
    }

As tasks are created, they will appear inside the corresponding `tasks` arrays.

---

## Create Task in a List

**Endpoint**

`POST /lists/:listId/tasks`

Creates a new task inside the list with the provided `listId`.

- `listId` is taken from the URL (e.g. `1`, `2`, `3`).
- Task IDs are generated using `uuid`.

**Request Body (JSON)**

    {
      "title": "Study",
      "description": "Start coding your taskboard project"
    }

**Success Response – 201 Created**

    {
      "id": "f3b78d7a-7dc1-4a8e-9e35-1a4b2cc9bb57",
      "title": "Study",
      "description": "Start coding your taskboard project"
    }

---

## Error Responses

**400 – Missing fields**

    {
      "error": "Title and description are required!"
    }

**404 – List not found**

    {
      "error": "List '5' not found!"
    }

---

## Data Model (In-Memory Board)

The board is stored in `storage/db.js` as a simple JavaScript object:

    const db = {
      board: {
        id: "board1",
        name: "My Board",
        lists: [
          { id: "1", name: "To Do", tasks: [] },
          { id: "2", name: "In Progress", tasks: [] },
          { id: "3", name: "Done", tasks: [] }
        ]
      }
    };

    module.exports = { db };

This is in-memory storage only. Restarting the server resets all tasks.

---

## Known Limitations

- Data is not persisted: everything is in-memory and lost on server restart.
- There is no authentication or authorization.
- No pagination, filtering, or multiple boards support yet.
- No automated tests included at this stage.

---

## Possible Extensions (Bonus Ideas)

- **Move a task between lists**  
  `PATCH /tasks/:taskId` with a new `list_id`.

- **Delete a task**  
  `DELETE /tasks/:taskId`.

- **Persistence layer**  
  Save the board to a JSON file or database (SQLite/Postgres).

- **Tests**  
  Add unit/integration tests with Jest.

- **Deployment**  
  Deploy the API.
