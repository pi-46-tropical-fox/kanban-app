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
- POST /googleLogin
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
    "id": 1,
    "name": "Faudzan",
    "access_token": "<access_token>"
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

### POST /googleLogin

> Login user by google account

_Request Header_
```json
{
  "google_access_token": "<google_access_token>"
}
```

_Request Body_
```json
not needed
```

_Response (200)_
```json
{
    "id": 1,
    "name": "Faudzan",
    "access_token": "<access_token>"
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
  "access_token": "<access_token>"
}
```

_Request Body_
```json
{
  "title": "Fitur Delete",
  "description": "Fitur delete belum berfungsi. Deadline besok sore!",
  "category": "todo"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "title": "Fitur Delete",
  "description": "Fitur delete belum berfungsi. Deadline besok sore!",
  "category": "todo",
  "UserId": 2,
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
  "access_token": "<access_token>"
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
    "title": "Fitur Delete",
    "description": "Fitur delete belum berfungsi. Deadline besok sore!",
    "category": "todo",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "tampilan home page",
    "description": "tampilan dibuat simpel tapi elegan",
    "category": "done",
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
  "access_token": "<access_token>"
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
  "title": "Fitur Delete",
  "description": "Fitur delete belum berfungsi. Deadline besok sore!",
  "category": "todo",
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
  "access_token": "<access_token>"
}
```

_Request Body_
```json
{
  "id": 1,
  "title": "Fitur Delete",
  "description": "Fitur delete belum berfungsi. Deadline besok sore!",
  "category": "doing"
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
  "access_token": "<access_token>"
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