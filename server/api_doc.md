# Fancy Todo App Server
Kanban adalah Single Page Application (SPA) yang bertujuan untuk... 
Aplikasi ini memiliki konfigurasi dan fitur sebagai berikut : 
* xxx
* xxx

Constraint Aplikasi:
* ...
* ...
* ...

&nbsp;

## Depedencies
* axios
* bcryptjs
* cors
* dotenv
* express
* google-auth-library
* jsonwebtoken
* pg
* sequelize
* bootstrapcss

## Endpoints
* POST /register
* POST /login
* POST /googleLogin
* POST /tasks
* GET /tasks
* GET /tasks/:id
* PUT /tasks/:id
* DELETE /tasks/:id


## RESTful endpoints
### POST /register

> Create new user
  - name, email, and password harus diisi
  - email harus unik
  - email harus menggunakan format email
  - password min 6 characters
  - apabila pictureUrl tidak diisi maka akan disematkan foto avatar default yang telah disiapkan
  - organization akan secara default diisi dengan "Hacktiv8

_Request Header_
```
no need
```

_Request Body_
```json
{
    "name": "Amanda Caessara",
    "email": "amanda@mail.com",
    "password": "123456",
    "organzation": "Hacktiv8",
    "pictureUrl": "http://pictureamanda/twitter.com"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "Amanda Caessara",
    "email": "amanda@mail.com",
    "organization": "Hacktiv8"
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
  - password akan di "hash" menggunakan bcrypjtjs sebelum disimpan dalam database


_Request Header_
```
no need
```

_Request Body_
```json
{
  "email": "amanda@mail.com",
  "password": "123456"
}
```

_Response (200 - Ok)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey",
    "id": 1,
    "name": "Amanda Caessara",
    "organization": "Hacktiv8"
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
  - password akan disetup secara default oleh server dan di "hash"menggunakan bcrypjtjs sebelum disimpan dalam database
  - User yang login dengan google OAuth akan otomatis diassign dengan organization "Hacktiv8"


_Request Header_
```json
{
  "google_access_token": "<your google access token>"
}
```

_Request Body_
```
none
```

_Response (200 - Ok)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey",
    "id": 10,
    "name": "Viona Moudiani",
    "organization": "Hacktiv8"
}
```

_Response (400 - Bad request)_
```json
{
  "message": "Bad request"
}
```


### POST /tasks

> Create a new task
  - Category, task dan description harus diisi
  - Category memiliki pilihan: Backlog, Todo, Doing, dan Done
  - User harus login terlebih dahulu untuk mengakses laman ini
  - UserId/PIC task akan otomatis terisi berdasarkan id User yang menambahkan task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "category": "Backlog",
  "task": "Mencuci",
  "description": "Mencuci baju menggunakan mesin cuci"
}
```

_Response (201 - Created)_
```json
{
    "id": 5,
    "category": "Backlog",
    "task": "Mencuci",
    "description": "Mencuci baju menggunakan mesin cuci",
    "UserId": 10,
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
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


### GET /tasks

> Get task list
  - User harus login untuk mengakses laman ini

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
    "id": 5,
    "category": "Backlog",
    "task": "Mencuci",
    "description": "Mencuci baju menggunakan mesin cuci",
    "UserId": 10,
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
  },
  {
    "id": 7,
    "category": "Backlog",
    "task": "Memasak",
    "description": "Memasak pasta special",
    "UserId": 3,
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
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


### GET /tasks/:id

> Get a task that owned by certain user
  - User harus login untuk mengakses laman ini
  - Hanya authorized user yang dapat mengakses laman ini

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no need
```

_Request Params_
```
task id
```

_Response (200 - Ok)_
```json
{
    "id": 5,
    "category": "Backlog",
    "task": "Mencuci",
    "description": "Mencuci baju menggunakan mesin cuci",
    "UserId": 10,
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
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
  "message": "Task data is not found!"
}
```


### PUT /tasks/:id

> Update a spesific task
  - User harus login terlebih dahulu untuk mengakses laman ini
  - Hanya authorized user yang dapat mengakses laman ini, yaitu user yang menjadi PIC pada task tersebut

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
    "category": "Backlog",
    "task": "Mencuci",
    "description": "Mencuci baju menggunakan mesin cuci"
}
```

_Response (200 - Ok)_
```json
{
    "id": 5,
    "category": "Backlog",
    "task": "Mencuci",
    "description": "Mencuci baju menggunakan mesin cuci",
    "UserId": 10,
    "updatedAt": "4 September 2020",
    "createdAt": "4 September 2020"
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


### Delete /tasks/:id

> Delete a task owned by an authorized User
  - User harus login untuk mengakses laman ini
  - Hanya authorized user yang dapat menghapus task yang dimiliki oleh user tersebut


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
