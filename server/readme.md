# kanban-server
<!-- ## Environment Variables
|Name|Description|Default value
|-|-|-|
|`PORT`|Port untuk server|`3000`| -->


## API Documentation

### Endpoints
```
POST /user/login
POST /user/register
POST /user/googlelogin

GET /tasks
GET /tasks/categories

POST /tasks

PUT /tasks/:id
DELETE /tasks/:id
```

## POST /user/register
### Request Header
```json
not required
```
### Request Body
```json
{
    "name" : "Regan Iwadha",
    "password" : "password",
    "email" : "myemail@email.com"
}
```

### Response (200)
```json
{
    "id" : 6,
    "name" : "Regan Iwadha",
    "email" : "myemail@email.com",
}
```

### Response (400)
```json
{
    "errors": [
        "Invalid Email",
        "Password must be more than 6 characters!"
    ]
}
```

## POST /user/login
### Request Header
```json
not required
```

```json
{
    "email" : "myemail@email.com",
    "password" : "password"
}
```

### Response (200)
```json
{
    "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyZWFnYW5pd2FkaGFAcHJvdG9ubWFpbC5jb20iLCJpYXQiOjE1OTk4MzkxNzl9.v3RMcr6lCcoENHTwhjdsajuJiEyHVpYH5lmP58jNWP",
    "email" : "myemail@email.com"
}
```

### Response (400)
```json
{
    "errors" : ["Email/Password combination not found"]
}
```


## POST /user/googlelogin
### Request Header
```json
not required
```

### Request Body
```json
{
    "google_access_token" : "google access token here"
}
```

### Response (200)
```json
{
    "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyZWFnYW5pd2FkaGFAcHJvdG9ubWFpbC5jb20iLCJpYXQiOjE1OTk4MzkxNzl9.v3RMcr6lCcoENHTwhjdsajuJiEyHVpYH5lmP58jNWP",
    "email" : "myemail@email.com"
}
```

## GET /tasks
### Request Header
```json
{
    "access_token" : "<jwt access token>"
}
```

### Response (200)
```json
[
    {
        "id": 68,
        "title": "",
        "createdAt": "2020-09-11T15:53:27.140Z",
        "updatedAt": "2020-09-11T15:53:27.140Z",
        "UserId": 3,
        "TaskCategoryId": 1,
        "TaskCategory": {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-09-11T10:29:50.586Z",
            "updatedAt": "2020-09-11T10:29:50.586Z"
        },
        "User": {
            "email": "reaganiwadha@gmail.com",
            "name": "Regan Iwadha"
        }
    },
    {
        "id": 69,
        "title": "a",
        "createdAt": "2020-09-11T15:53:28.334Z",
        "updatedAt": "2020-09-11T15:53:28.334Z",
        "UserId": 3,
        "TaskCategoryId": 1,
        "TaskCategory": {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-09-11T10:29:50.586Z",
            "updatedAt": "2020-09-11T10:29:50.586Z"
        },
        "User": {
            "email": "reaganiwadha@gmail.com",
            "name": "Regan Iwadha"
        }
    },
    {
        "id": 70,
        "title": "a",
        "createdAt": "2020-09-11T15:54:33.919Z",
        "updatedAt": "2020-09-11T15:54:33.919Z",
        "UserId": 3,
        "TaskCategoryId": 1,
        "TaskCategory": {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-09-11T10:29:50.586Z",
            "updatedAt": "2020-09-11T10:29:50.586Z"
        },
        "User": {
            "email": "reaganiwadha@gmail.com",
            "name": "Regan Iwadha"
        }
    },
    {
        "id": 71,
        "title": "s",
        "createdAt": "2020-09-11T15:55:07.644Z",
        "updatedAt": "2020-09-11T15:55:07.644Z",
        "UserId": 3,
        "TaskCategoryId": 1,
        "TaskCategory": {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-09-11T10:29:50.586Z",
            "updatedAt": "2020-09-11T10:29:50.586Z"
        },
        "User": {
            "email": "reaganiwadha@gmail.com",
            "name": "Regan Iwadha"
        }
    },
    {
        "id": 72,
        "title": "s",
        "createdAt": "2020-09-11T15:55:10.900Z",
        "updatedAt": "2020-09-11T15:55:10.900Z",
        "UserId": 3,
        "TaskCategoryId": 1,
        "TaskCategory": {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-09-11T10:29:50.586Z",
            "updatedAt": "2020-09-11T10:29:50.586Z"
        },
        "User": {
            "email": "reaganiwadha@gmail.com",
            "name": "Regan Iwadha"
        }
    },
    {
        "id": 44,
        "title": "j",
        "createdAt": "2020-09-11T11:51:26.814Z",
        "updatedAt": "2020-09-11T11:51:26.814Z",
        "UserId": 1,
        "TaskCategoryId": 1,
        "TaskCategory": {
            "id": 1,
            "name": "Backlog",
            "createdAt": "2020-09-11T10:29:50.586Z",
            "updatedAt": "2020-09-11T10:29:50.586Z"
        },
        "User": {
            "email": "reaganiwadha@protonmail.com",
            "name": "Regan"
        }
    }
]
```

### Response (401)
```json
{
    "errors" : ["Unauthorized"]
}
```

## GET /tasks/categories
### Request Header
```json
{
    "access_token" : "<jwt access token>"
}
```

### Response (200)
```json
[
    {
        "id": 1,
        "name": "Backlog",
        "createdAt": "2020-09-11T10:29:50.586Z",
        "updatedAt": "2020-09-11T10:29:50.586Z"
    },
    {
        "id": 2,
        "name": "Todo",
        "createdAt": "2020-09-11T10:29:50.586Z",
        "updatedAt": "2020-09-11T10:29:50.586Z"
    },
    {
        "id": 3,
        "name": "Doing",
        "createdAt": "2020-09-11T10:29:50.586Z",
        "updatedAt": "2020-09-11T10:29:50.586Z"
    },
    {
        "id": 4,
        "name": "Done",
        "createdAt": "2020-09-11T10:29:50.586Z",
        "updatedAt": "2020-09-11T10:29:50.586Z"
    }
]
```

## POST /tasks
### Request Header
```json
{
    "access_token" : "<jwt access token>"
}
```

### Request Body
```json
{
    "title" : "Halo",
    "category" : 2
}
```

### Response (200)
```json
{
    "task": {
        "id": 76,
        "title": "Halo",
        "UserId": 1,
        "TaskCategoryId": 2,
        "updatedAt": "2020-09-11T16:20:57.415Z",
        "createdAt": "2020-09-11T16:20:57.415Z"
    }
}
```

### Response (400)
```json
{
    "errors" : ["Title cannot be empty!"]
}
```

## PUT /tasks/:id
### Request Header
```json
{
    "access_token" : "<jwt access token>"
}
```

### Request Body
```json
{
    "category" : 2
}
```

### Response (200)

```json
{
    "message" : "Task successfully updated"
}
```

## DELETE /tasks/:id
### Request Header
```json
{
    "access_token" : "<jwt access token>"
}
```
### Request Body
```
not required
``` 

## Response (202)
```json
{
    "message" : "Task successfuly deleted"
}
```

