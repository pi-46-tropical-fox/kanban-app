# My Assets App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
* POST /register => Untuk register User
* POST /login => Untuk login User
* GET /category => Untuk menampilkan category
* PUT /category/:taskId => Untuk memindah category berdasarkan task Id 
* GET /task => Menampilkan Task berdasarkan id Organisasi
* POST /task => Menambahkan Task berdasarkan id Organisasi
* GET /task/:taskId => Mendapatkan data Task berdasarkan id Task
* PUT /task/:taskId => Memperbarui data Task berdasarkan id Task
* DELETE /task/:taskId => Menghapus data Task berdasarkan id Task
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
### GET /category

> Get all category

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
    "name": "Backlog"
  },
  {
    "id": 2,
    "name": "Todo"
  },
  {
    "id": 3,
    "name": "Doing"
  },
  {
    "id": 4,
    "name": "Done"
  },
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
### PUT /category/:taskId

> Switch Task Category

_Request Header_
```
{
  "access_token": "<jwt_token>"
}
```

_Request Body_
```
{
  "number": 1
}
```

_Response (200)_
```
{
  "message": 'Successfully to Switch'
}
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
### GET /task

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
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "categoryId": "1",
    "user": {
      id: 1,
      email: user@mail.com
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
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /task

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
  "category": "Doing",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
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
### GET /task/:taskId

> Get task by Id

_Request Header_
```
{
  "access_token": "<jwt_token>"
}
```
_Request Body_
```
```

_Response (200)_
```
{
  "id": 3,
  "title": "Live Code Week 6",
  "category": "Doing",
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
### PUT /task/:taskId

> Update task

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
### DELETE /task/:taskId

> Delete task

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