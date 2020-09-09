# My Assets App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
* POST /register => Untuk register User
* POST /login => Untuk login User
* GET /organization => Untuk mendapatkan nama organisasi
* POST /organization => Menambahkan Organisasi
* GET /:organizationId/task => Menampilkan Task berdasarkan id Organisasi
* POST /:organizationId/task => Menambahkan Task berdasarkan id Organisasi
* GET /:organizationId/task/:taskId => Mendapatkan data Task berdasarkan id Task
* PUT /:organizationId/task/:taskId => Memperbarui data Task berdasarkan id Task
* DELETE /:organizationId/task/:taskId => Menghapus data Task berdasarkan id Task
---
### POST /login

> Login to User

_Request Header_
```
not needed
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
    "email": "user@mail.com",
    "password": "abc123",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
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
### POST /register

> Register User

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```
_Request Body_
```
{
    "email": "user2@mail.com",
    "password": "abc123",
}
```

_Response (201)_
```
[
  {
    "id": 2,
    "email": "user2@mail.com",
  }
]
```

_Response (400 - Bad Request)_
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
### GET /organization

> Get all organization

_Request Header_
```
{
  "access_token": "<jwt_token>"
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
    "name": "Hackitv8",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
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
### POST /organization

> Create new Organization

_Request Header_
```
{
  "access_token": "<jwt_token>"
}
```

_Request Body_
```
{
  "name": "Tropical Fox"
}
```

_Response (201 - Created)_
```
{
  "id": 2,
  "name": "Tropical Fox"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /:organizationId/task

> Get all Task

_Request Header_
```
{
  "access_token": "<jwt_token>"
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
    "tile": "Kanban-app",
    "category": "Development",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Fancy Todo",
    "category": "Done",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
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
### POST /:organizationId/task

> Create new task

_Request Header_
```
{
  "access_token": "<jwt_token>"
}
```

_Request Body_
```
{
  "title": "Live Code Week 6",
  "category": "Done"
}
```

_Response (201 - Created)_
```
{
  "id": 3,
  "title": "Live Code Week 6",
  "category": "Done",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /:organizationId/task/:taskId

> Create new task

_Request Header_
```
{
  "access_token": "<jwt_token>"
}
```
_Request Body_
```
{
  "title": "Pair Project week 6",
  "category": "Done"
}
```

_Response (200)_
```
{
  "id": 3,
  "title": "Pair Project Week 6",
  "category": "Done",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT /:organizationId/task/:taskId

> Create new task

_Request Header_
```
{
  "access_token": "<jwt_token>"
}
```

_Response (200)_
```
{
  "id": 3,
  "title": "Live Code Week 6",
  "category": "Done",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
### DELETE /:organizationId/task/:taskId

> Create new task

_Request Header_
```
{
  "access_token": "<jwt_token>"
}
```

_Response (200)_
```
{
  "id": 3,
  "title": "Live Code Week 6",
  "category": "Done",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```