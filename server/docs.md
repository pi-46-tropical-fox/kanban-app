# kanbannya izra

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

### `POST` /register

Request:

- data:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

### `POST` /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "id": "integer",
    "username": "string",
    "email": "string",
    "access_token": "jwt string"
}
```

### `GET` /tasks


Get all tasks of the organization from database

Request:

- headers: `access_token (string)`

Response:

- status: 200
- body:

```json
{
  "tasks": [
    {
      "id": "integer",
      "title": "string",
      "status": "string"
    }
  ]
}
```

### `POST` /tasks

Add a task to organization's kanban

Request:

- headers: access_token (string)
- body: 
  ```json
  {
      "title": "string"
  }
  ```


Response:

- status: 201
- body:

```json
{
    "task": {
        "id": "integer",
        "title": "string",
        "status": "string",
        "assignee": "string",
        "company": "string"
    }
}
```

### `PUT` /tasks/:id

Move a task forward or backward in stage/category

Request:

- headers: `access_token (string)`
- params: `id (integer)`
- body: `movement (string: 'next' / 'prev')`

Response:

- status: 200
- body:

```json
{
    "task": {
        "id": "integer",
        "title": "string",
        "status": "string"
    }
}
```

### `PATCH` /tasks/:id
Edit a task

Request:

- headers: `access_token (string)`
- params: `id: (integer)`
- body:
```json
{
    "title": "string"
}
```

Response:

- status: 200
- body:

```json
{
    "task": {
        "id": "integer",
        "title": "string",
        "status": "string"
    }
}
```

### `DELETE` /tasks/:id

Delete task

Request:

- headers: `access_token (string)`
- params: `id: (integer)`

Response:

- status: 200
- body:

```json
{
  "message": "Task deleted Successfully"
}
```

