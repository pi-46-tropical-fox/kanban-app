# My Kanban App Server
My Kanban App is an application to manage your activities. This app has : 
* CRUD Todo
* JSON formatted response

&nbsp;

## endpoints
``` 
- GET /tasks
- POST /tasks
- GET /tasks/:taskId
- PUT /tasks/:taskId
- PUT /tasks/category/:taskId
- DELETE /tasks/"taskId
- POST /users/register
- POST /users/login
- POST /users/google-login
```

## RESTful endpoints
### GET /tasks

> Get all tasks

_Request Header_
```
{
  "access_token": "<jwt generated token>"
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
        "id": 4,
        "title": "login",
        "description": "google dan normal",
        "category": "Back Log",
        "UserId": 1,
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z",
        "User": {
            "id": 1,
            "email": "ark123@gmail.com",
            "password": "$2a$10$/ZVPQdtWLhB7mnRFqhJPr.Di/YHYJBW.y.ReuXPOhfioCBO4qRJ.G",
            "fullName": "Arrizal Rahmat Kurniawan",
            "role": "Full Stack Developer",
            "createdAt": "2020-09-08T12:21:26.156Z",
            "updatedAt": "2020-09-08T12:21:26.156Z"
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


### POST /tasks

>Create a new task

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
{
    "category": "Back Log",
    "description": "di tempat",
    "title": "jalan kaki"
    
    
}
```

_Response (200)_
```
{
    "id": 7,
    "title": "jalan kaki",
    "description": "di tempat",
    "category": "Back Log",
    "UserId": 1,
    "updatedAt": "2020-09-11T09:40:58.169Z",
    "createdAt": "2020-09-11T09:40:58.169Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---



### GET /tasks/:taskId

> Get tasks where id:req.params.taskId

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```

```

_Response (200)_
```
[
    {
        "id": 4,
        "title": "login",
        "description": "google dan normal",
        "category": "Back Log",
        "UserId": 1,
        "createdAt": "2020-09-11T04:02:14.558Z",
        "updatedAt": "2020-09-11T04:02:14.558Z",
        "User": {
            "id": 1,
            "email": "ark123@gmail.com",
            "password": "$2a$10$/ZVPQdtWLhB7mnRFqhJPr.Di/YHYJBW.y.ReuXPOhfioCBO4qRJ.G",
            "fullName": "Arrizal Rahmat Kurniawan",
            "role": "Full Stack Developer",
            "createdAt": "2020-09-08T12:21:26.156Z",
            "updatedAt": "2020-09-08T12:21:26.156Z"
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



### PUT /tasks/:taskId

>Update task where id:req.params.id

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
{
    "category": "Back Log",
    "description": "di tempat",
    "title": "jalan kaki"
}
```

_Response (200)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---



### PUT /tasks/category/:taskId

>Update task category where id:req.params.id

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
{
    "category": "Feature",
    "description": "di tempat",
    "title": "jalan kaki"
}
```

_Response (200)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---



### DELETE /tasks/:taskId

>Delete task where id:req.params.id

_Request Header_
```
{
  "access_token": "<jwt generated token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    1
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---

### POST /user/register

> Create new account

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    fullName: "user's fullName",
    email: "user's email",
    password: "user's password",
    role: "user's role"
}
```

_Response (201)_
```
{
    fullName: "user's fullName",
    email: "user's email",
    role: "user's role"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "User.password cannot be null"
}
```
_Response (500 - Bad Request)_
```
{
  "message": ["Invalid email format",
              "Password must be at least 6 characters"]
}
```
---
### POST /user/login

> user login

_Request Header_
```
{
not needed
}
```

_Request Body_
```
{
    "email": "user's email",
    "password": "user's password"
}
```

_Response (200 - OK)_
```
{
  "access_token": "JWT generated token"
}
```

_Response (400 - Bad Request)_
```
{
  "message":"Invalid email or password"
}
```

### POST /user/google-login

> user login with google OAuth2

_Request Header_
```
{
  google_access_token: "access token given by google"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    access_token: "JWT generated google payload"
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "There was an error. Please try again later. That’s all we know."
}
```
---