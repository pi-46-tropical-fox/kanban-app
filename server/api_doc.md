# Kanban App Server
Kanban adalah aplikasi web berbasi Single Page Application (SPA) yang bertujuan untuk memanajemen segala aktivitas. Aplikasi ini memungkinkan Anda untuk memantau kemajuan dan mengedit task serta memantau progress atau status penyelesaiannya.

Aplikasi ini memiliki konfigurasi dan fitur sebagai berikut : 
* RESTful endpoint dengan operasi CRUD.
* Format respon berupa JSON.
* Assosiasi "one-to-many" dimana satu User dapat memiliki banyak Task.
* Assosiasi "many-to-many" dimana satu USer dapat memiliki banyak Organisasi dan sebaliknya.
* Task memiliki beberapa category diantarnya: BACKLOG, TODO, DOING, dan DONE. Setiap task akan ditampilkan berdasarkan categorynya masing-masing.

&nbsp;

## Depedencies
* "axios"
* "bcrypt"
* "cors"
* "dotenv"
* "express"
* "google-auth-library"
* "jsonwebtoken"
* "nodemon"
* "pg"
* "sequelize"

## Endpoints
* POST /register
* POST /login
* POST /googleLogin

* GET /kanban
* GET /kanban/:id
* PUT /kanban/:id
* POST /kanban/:id
* DELETE /kanban/:id

* POST /kanban/:id/tasks
* GET /kanban/:id/tasks/:id
* PUT /kanban/:id/tasks/:id
* DELETE /kanban/:id/tasks/:id


## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
no need
```

_Request Body_
```json
{
    "username": "admin123",
    "email": "admin@mail.com",
    "password": "adminadmin",
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "username": "admin123",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid required users data"
}
```


### POST /login

> Login to app

_Request Header_
```
no need
```

_Request Body_
```json
{
  "username": "admin123",
  "password": "adminadmin"
}
```

_Response (200 - Ok)_
```json
{
    "access_token": "<autogenerate>"
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Email or/and password is invalid"
}
```

### POST /googleLogin

> OAuth Login by google

_Request Header_
```json
{
  "google_access_token": "<autogenerate>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
{   
     "username": "admin",
     "email": "admin@gmail.com",
     "password": "<autogenerate>"
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Bad request"
}
```


### POST /kanban/:id/tasks

> Create a new task

```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "title": "test",
    "description": "test",
    "date_post": "30 desember 2020",
    "due_date": "5 januari 2021",
    "UserId" : "1",
    "CategoryId" : "1"
}
```

_Response (201 - Created)_
```json
{
    "title": "test",
    "description": "test",
    "date_post": "30 desember 2020",
    "due_date": "5 januari 2021",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Category/Task/Description harus diisi"
},
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### GET /kanban/:id/tasks/:id

> Get task list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
[
  {
    "id": 1,
    "title": "test",
    "description": "test",
    "date_post": "30 desember 2020",
    "due_date": "5 januari 2021",
    "CategoryId": 1,
    "UserId": 1,
  },
  {
    "id": 2,
    "title": "test",
    "description": "test",
    "date_post": "30 desember 2020",
    "due_date": "5 januari 2021",
    "CategoryId": 2,
    "UserId": 1,
  }
]
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```

### PUT /kanban/:id/tasks/:id

> Update a spesific task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
task id
```

_Request Body_
```json
{
    "task": "test",
    "description": "test-test"
}
```

_Response (200 - Ok)_
```json
{
    "id": 2,
    "title": "test",
    "description": "test-test",
    "date_post": "30 desember 2020",
    "due_date": "5 januari 2021",
    "CategoryId": 2,
    "UserId": 1,
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo data is not found!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```


### Delete /kanban/:id/tasks/:id

> Delete a task owned by an authorized User

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params
```
todos title
```

_Request Body_
```
ne need
```

_Response (200 - Ok)_
```json
{
  "message": "Task is successfully deleted!"
}
```

_Response (401 - Not Athenticated)_
```json
{
  "message": "User not authenticated"
}
```

_Response (402 - Not Athorized)_
```json
{
  "message": "User not authorized"
}
_Response (404 - Not Found)_
```json
{
  "message": "Todo data is not found!"
}
```


_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```