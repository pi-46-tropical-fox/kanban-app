# kanban-app

## RESTful endpoints
&nbsp;
### POST /tasks

> Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "category": "<category to get insert into>",
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<title to get insert into>",
  "category": "<category to get insert into>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### GET /tasks

> Get all tasks

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
    "title": "<title to get insert into>",
    "category": "<category to get insert into>",
    "due_date": "<due_date to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<name to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<due_date to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### GET /tasks/:id

> Get tasks based id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of todo>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
  {
    "id": 1,
    "title": "<title to get insert into>",
    "category": "<category to get insert into>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```


### PUT /tasks/:id

> Update todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of tasks>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "category": "<category to get insert into>",
}
```

_Response (200 - Updated)_
```
{
  "id": <given id by system>,
  "title": "<title to get insert into>",
  "category": "<category to get insert into>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### DELETE /tasks/:id

> Get fancy-todo based id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
    "id": "<id of task>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
  {
    "id": 1,
    "title": "<title to get insert into>",
    "category": "<category to get insert into>",
  }
```

_Response (404 - Not Found)_
```
{
  "message": "Not Found"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### POST /register

> Create new user

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",  
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<email to get insert into>",
  "organization": <given organization by system>
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

### POST /login

> Login user

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",  
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```
---
User bisa create dan findAll tasks jika memberikan accesstoken. acces token tersebut sudah terverivikasi(Authentication)

---
User hanya bisa melihat (findOne), menghapus dan mengedit tasks-nya sendiri (Authorization)
