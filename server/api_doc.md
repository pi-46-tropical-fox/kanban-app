# Kanban App API
Kanban App is an application to manage your tasks along with your organization peers.
This app has : 
* RESTful endpoints for user register and login features
* RESTful endpoints for task CRUD operations
* JSON formatted response

&nbsp;

## Endpoints
```
 - POST /users/register
 - POST /users/login
 - POST /users/google-login
 - POST /tasks
 - GET /tasks
 - PUT /tasks/:TaskId
 - DELETE /tasks/:TaskId
```

## RESTful endpoints
### POST /users/register

> User Registration

_Request Header_
```
not needed
```

_Request Body_
```
{
  "access_token": "<your access token>",
  "UserId": "1"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "email": "johndoe@mail.com",
  "organization": "Hacktiv8"
}
```

_Response (400 - Bad Request)_
```
[
  "<error message 1>",
  "<error message 2>",
  ...,
  "<error message n>"
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### POST /users/login

> User Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "johndoe@mail.com",
  "password": "johndoe123"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "UserId": 1
}
```

_Response (400 - Bad Request)_
```
[
  "The Email or Password is invalid."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### POST /users/google-login

> User Login via Google

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "UserId": "<your user id>"
}
```

_Response (400 - Bad Request)_
```
[
  "The Email or Password is invalid."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### POST /tasks

> Create New Task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Create Kanban Layout",
  "category": "Backlog",
  "description": "Create Kanban Layout with Bootstrap Vue",
  "UserId": 1
}
```

_Response (201 - Created)_
```
{
  "id": "1",
  "title": "Create Kanban Layout",
  "category": "Backlog",
  "description": "Create Kanban Layout with Bootstrap Vue",
  "UserId": "1",
  "createdAt": "2020-01-27T07:15:12.149Z",
  "updatedAt": "2020-01-27T07:15:12.149Z",
}
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### GET /tasks

> Get All Tasks

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

_Response (200 - OK)_
```
[
  {
    "id": "1",
    "title": "Create Kanban Layout",
    "category": "Backlog",
    "description": "Create Kanban Layout with Bootstrap Vue",
    "UserId": 1,
    "createdAt": "2020-01-27T07:15:12.149Z",
    "updatedAt": "2020-01-27T07:15:12.149Z",
    "User": {
        "id": 1,
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "password": "$2a$10$8cNk9n5a52qj9Ev1qQC5keD7.UjqlAgvYtSL/1hM/WXYDsY2JQhPu",
        "organization": "Hacktiv8",
        "createdAt": "2020-09-11T01:25:58.457Z",
        "updatedAt": "2020-09-11T01:25:58.457Z"
    }
  },
  {
    "id": "2",
    "title": "Create CRUD Features",
    "category": "To Do",
    "description": "Create CRUD Features with Sequelize and PosgreSQL",
    "UserId": 1,
    "createdAt": "2020-01-27T07:15:12.149Z",
    "updatedAt": "2020-01-27T07:15:12.149Z",
    "User": {
        "id": 1,
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "password": "$2a$10$8cNk9n5a52qj9Ev1qQC5keD7.UjqlAgvYtSL/1hM/WXYDsY2JQhPu",
        "organization": "Hacktiv8",
        "createdAt": "2020-09-11T01:25:58.457Z",
        "updatedAt": "2020-09-11T01:25:58.457Z"
    }
  },
  {
    "id": "3",
    "title": "Deploy",
    "category": "Done",
    "description": "Deploy server with Heroku, and client with Firebase",
    "UserId": 2,
    "createdAt": "2020-01-27T07:15:12.149Z",
    "updatedAt": "2020-01-27T07:15:12.149Z",
    "User": {
        "id": 2,
        "username": "janedoe",
        "email": "janedoe@mail.com",
        "password": "$2lekd88cNk9n5a52qj9Ev1qQk39eD7.UjqlAgvYtSL/1hM/WXYDsY2JQhPu",
        "organization": "Hacktiv8",
        "createdAt": "2020-09-11T01:30:47.457Z",
        "updatedAt": "2020-09-11T01:30:47.457Z"
    }
  }
]
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### PUT /tasks/:TaskId

> Update Task by Task Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Create Kanban Layout",
  "category": "Doing",
  "description": "Create Kanban Layout with Bootstrap Vue"
}
```

_Response (200 - OK)_
```
{
  "id": 1,
  "title": "Create Kanban Layout",
  "category": "Doing",
  "description": "Create Kanban Layout with Bootstrap Vue",
  "UserId": 1,
  "createdAt": "2020-01-27T07:15:12.149Z",
  "updatedAt": "2020-01-28T06:10:09.257Z",
}
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
---
### DELETE /tasks/:TaskId

> Delete Task by Task Id

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

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "Create Kanban Layout",
    "category": "Doing",
    "description": "Create Kanban Layout with Bootstrap Vue",
    "UserId": 1,
    "createdAt": "2020-09-11T01:39:55.743Z",
    "updatedAt": "2020-09-11T07:44:31.593Z",
    "User": {
        "id": 1,
        "username": "johndoe",
        "email": "johndoe@mail.com",
        "password": "$2a$10$8cNk9n5a52qj9Ev1qQC5keD7.UjqlAgvYtSL/1hM/WXYDsY2JQhPu",
        "organization": "Hacktiv8",
        "createdAt": "2020-09-11T01:25:58.457Z",
        "updatedAt": "2020-09-11T01:25:58.457Z"
    }
}
```

_Response (401 - Unauthorized)_
```
[
  "The user is not authenticated"
]
```

_Response (403 - Forbidden)_
```
[
  "The user is not authorized."
]
```

_Response (500 - Internal Server Error)_
```
[
  "<error message>"
]
```
