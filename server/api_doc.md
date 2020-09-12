# My Todos App Server
My Todos App is an application to manage your todos. This app has : 
* RESTful endpoint for todo's CRUD operation
* Register and Login
* JSON formatted response

&nbsp;

## Endpoints
``` 
- GET /categories
- GET /tasks
- POST /tasks/:categoryId
- GET /tasks/:taskId
- PUT /tasks/:taskId
- PUT /tasks/:taskId/:categoryId
- DELETE /tasks/:taskId
- POST /register
- POST /login
```

## RESTful endpoints
### GET /categories

> Get all categories

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "Backlog",
    "createdAt": "2020-09-10T19:50:58.206Z",
    "updatedAt": "2020-09-10T19:50:58.206Z"
  },
  {
    "id": 2,
    "name": "To Do",
    "createdAt": "2020-09-10T19:50:58.206Z",
    "updatedAt": "2020-09-10T19:50:58.206Z"
  },
  {
    "id": 3,
    "name": "Doing",
    "createdAt": "2020-09-10T19:50:58.206Z",
    "updatedAt": "2020-09-10T19:50:58.206Z"
  },
  {
    "id": 4,
    "name": "Done",
    "createdAt": "2020-09-10T19:50:58.206Z",
    "updatedAt": "2020-09-10T19:50:58.206Z"
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /tasks

> Get all tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 3,
    "title": "Server",
    "description": "Setup server",
    "CategoryId": 2,
    "UserId": 2,
    "createdAt": "2020-09-10T19:50:58.196Z",
    "updatedAt": "2020-09-10T19:50:58.196Z",
    "User": {
      "id": 2,
      "email": "abdul2@mail.com"
    }
  },
  {
    "id": 4,
    "title": "Axio",
    "description": "Setup axio di server",
    "CategoryId": 1,
    "UserId": 2,
    "createdAt": "2020-09-10T19:50:58.196Z",
    "updatedAt": "2020-09-10T19:50:58.196Z",
    "User": {
      "id": 2,
      "email": "abdul2@mail.com"
    }
  }
]
```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /tasks/:categoryId
Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": <task title>
}
```
_Response (201)_
```
  {
    "id": <given by system>
    "title": 'Backlog',
    "descritpion": null,
    "CategoryId": <automatically adjust depend on board that you click>
    "UserId": <automatically by user who login>
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  },
```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

### GET /tasks/:taskId

> Get task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200 - Ok)_
```
{
  "id": 1,
  "title": "Layout kanban",
  "description": "Bikin layout kanban dengan css flex dan grid",
  "CategoryId": 1,
  "UserId": 1,
  "createdAt": "2020-09-10T19:50:58.196Z",
  "updatedAt": "2020-09-11T14:30:54.027Z",
  "User": {
    "id": 1,
    "email": "abdul@mail.com"
  },
  "Category": {
    "id": 1,
    "name": "Backlog"
  }
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

---
### PUT /tasks/:taskId

> Update task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<task title>",
  "description": "<task description>"
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "<updated task title>",
  "description": "<updated task description>"
}

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### PUT /tasks/:taskId/:categoryId

> Move task category

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200)_
```
{
  "id": 28,
  "title": "<current title>",
  "description": "<current description>",
  "CategoryId": <updated category id>,
  "UserId": <user who log in>,
  "createdAt": "2020-09-12T17:03:56.086Z",
  "updatedAt": "2020-09-12T17:07:52.922Z"
}

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### DELETE /tasks/:taskId

> Delete task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
<'success deleting task'>
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /register

> Register your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>",
  "organization": <by default 'Hacktiv8' if its empty>
}
```

_Response (201 - created)_
```
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /login

> Login to your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your registered email>"
  "password": "<your registered password>",
}
```

_Response (200 - ok)_
```
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
