# Kanban App Server
Kanban App is an application to help you to organize your task. This app has : 
* Register and Login
* CRUD Tasks
* JSON formatted response

&nbsp;

## Endpoints
```
- POST /register
- POST /login
- POST /task
- GET /task
- GET /task/:id
- PUT /task/:id
- DELETE /task/:id
```

## RESTful endpoints

### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "organization": ""
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "name": "Faudzan Adzima",
  "email": "faudzanad@gmail.com",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "name must be filled",
  "message": "email must be filled",
  "message": "please insert email format",
  "message": "password must be filled",
  "message": "password minimum 6 characters",
  "message": "email already exists"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "invalid email or password"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### POST /task

> Create new task

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "category": "<category to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "title": "<posted title>",
  "description": "<posted description>",
  "category": "<posted category>",
  "UserId": "<posted UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "title must be filled",
  "message": "description must be filled",
  "message": "category must be filled"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```


### GET /task

> Show all task from database

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<task's title>",
    "description": "<task's description>",
    "category": "<task's category>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<task's title>",
    "description": "<task's description>",
    "category": "<task's category>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```
_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authenticate"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---

### GET /task/:id

> Show one task selected by id

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json

{
  "id": 1,
  "title": "<task's title>",
  "description": "<task's description>",
  "category": "<task's category>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

```
_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authenticate"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---

### PUT /task/:id

> Update task by id

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "category": "<category to get insert into>",
}
```

_Response (200)_
```json
{
  "message": "update success"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "task's not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "title must be filled",
  "message": "description must be filled",
  "message": "category must be filled"
}
```

_Response (403 - Forbidden Access)_
```json
{
  "message": "user not authorize"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---

### DELETE /task/:id

> Delete task by id from database

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
  "message": "delete success"
}
```

_Response (403 - Forbidden Access)_
```json
{
  "message": "user is not authorize"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "task's not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```