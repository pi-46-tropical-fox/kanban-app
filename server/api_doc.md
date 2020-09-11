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

### POST /googleLogin

> Login user by google account

_Request Header_
```json
{
  "google_access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmMzMyYjNlOWI5MjhiZmU1MWJjZjRmOGRhNTQzY2M0YmQ5ZDQ3MjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTUzNzk1NDkwNzI4LTdhbmo1ZzU0YmQxYzk1YzA5MXBmb25zbmtmcjI5Z3NjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTUzNzk1NDkwNzI4LTdhbmo1ZzU0YmQxYzk1YzA5MXBmb25zbmtmcjI5Z3NjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3ODcyMDkzODczODEzOTk1NTg0IiwiZW1haWwiOiJmYXVkemFudGlnYWR1YUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjVMTE5nZk1yWjBTSGpJa2JQNHZTclEiLCJuYW1lIjoiRmF1ZHphbiBBZHppbWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dRbGFfc21tWmktX21KeEZIbmZvbk9wUFJYNkJUVjBHa3VVeldUcUE9czk2LWMiLCJnaXZlbl9uYW1lIjoiRmF1ZHphbiIsImZhbWlseV9uYW1lIjoiQWR6aW1hIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTk4MDcxNjUsImV4cCI6MTU5OTgxMDc2NSwianRpIjoiZmU3ODkyM2E4NzhjOTVhYWE3ZDY1YjkwY2NiNTNiODI3NjcwNjgxZiJ9.FROpppWy0JmM6Q9YZsySG_XvN9wtQPfR3Q37zfAK9RadZnOe5R-fYmQppTHlBPlrr-UgaDyFZfFtSYWzfmuB-GyYbvFTbDkDihpAaX7NB0gTYMYJVCg33ns_0OEe3QVp8rhx6xwjU9pJvldAvH8xcmRiFrYKdUfiScHvT9Rvswm95oRxy5izoaxd5FXlewqWrBOc2fWm_MpWZQjajLI63EZzbl3RPyZWvicTvWjUni8LVjwu6PSIM9P8uGQfaO1Ch_-lauBCOGhTH8eggv6M4hdksKJinBqq6sGuwZYPHH-sQMbIqrERaTz2Dr8RK2xX585cgAnUThfieQ120wxNSg"
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
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
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