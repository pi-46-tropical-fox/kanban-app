# Kanban App Server
Kanban App is an application for creating and managing your personal kanban boards. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /register

> Register new user

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<email to be registered>",
    "password": "<password to be registered>"
}
```

_Response (201 - Created)_
```
{
    "msg": "registration success"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
---
### POST /login

> Register new user

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<login credentials>",
    "password": "<login credentials>"
}
```

_Response (201 - Created)_
```
{
    "access_token": "<access_token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```


### GET /tasks

> Get all todo list

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
    "title": "<task title>",
    "category": "<task category>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "UserId": "<user id associated with the task>"
  },
  {
    "id": 2,
    "title": "<task title>",
    "category": "<task category>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "UserId": "<user id associated with the task>"
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
### POST /tasks

> Create new todo

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
    "category": "<task status>"
}
```

_Response (201 - Created)_
```
{
    "id": <given by system>,
    "title": "<task title>",
    "category": "<task category>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "UserId": "<user id associated with the task>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /tasks/:id

> Get a todo by ID

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
{
    "id": <queried id>,
    "title": "<task title>",
    "category": "<task category>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "UserId": "<user id associated with the task>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Error Not Found"
}
```
---

### PUT /tasks/:id

> Modify/Update a todo by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<updated task title>",
    "category": "<updated task status>"
}
```

_Response (200)_
```
{
    "id": <modified task id>,
    "title": "<modified task title>",
    "category": "<modified task category>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "UserId": "<user id associated with the task>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Error Not Found"
}
```
---

### DELETE /todo/:id

> Delete a todo by ID

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
{
  message: 'Successfully deleted task'
}
```

_Response (404 - Not Found)_
```
{
  "message": "Invalid request"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---