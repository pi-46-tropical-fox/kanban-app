# kanban-app
Kanban App Server
Kanban App is an application to manage your assets. This app has :

&nbsp;

## Endpoints
````
- POST /register
- POST /login
- POST /googleLogin
- GET /tasks
- POST /tasks/:CategoryId
- GET /tasks/:id
- PUT /tasks/:id
- DELETE /tasks/:id
- POST /categories
````

### RESTful endpoints

### POST /register

> Create new user to database

_Request Header_
```
not needed
```

_Request Body_
```json

{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>",
}
```

_Response (201 - Created)_
```json

{
    "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Please input email format!, Password minimum 4 characters!"
}

```

_Response (500 - Internal Error Server)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /login

> Login to kanban

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
    "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

### POST /googleLogin

> Login to kanban app with your google account

_Request Header_
```
not needed
```

_Request Body_
```json
{
    "google_email": "<google email insert into>",
    "password_goole_email": "google password insert into"
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
    "message": "Cannot authorize google account"
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

### GET /tasks

> Show all the tasks lists
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
    "<category_name>": [
        {
            "id": 1,
            "title": "<title_name>",
            "UserId": 1,
            "CategoryId": 1,
            "createdAt": "2020-09-09T14:55:06.648Z",
            "updatedAt": "2020-09-09T15:30:58.690Z",
            "User": {
                "id": 1,
                "email": "<user_email>",
                "password": "<user_password>",
                "organization": "Hacktiv8",
                "createdAt": "2020-09-09T05:52:45.218Z",
                "updatedAt": "2020-09-09T05:52:45.218Z"
            },
            "Category": {
                "id": 1,
                "name": "<category_name>",
                "createdAt": "2020-09-09T14:47:18.118Z",
                "updatedAt": "2020-09-09T14:47:18.118Z"
            }
        }
    ]
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize User!"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /tasks/:CategoryId
> Create new tasks

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "title": "<title to get insert into>"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "title": "<title name>",
    "UserId": 1,
    "CategoryId": 1,
    "updatedAt": "2020-09-09T14:55:06.648Z",
    "createdAt": "2020-09-09T14:55:06.648Z"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "Please fill the title!"
}
```

### GET /tasks/:id
> Find detail tasks by ID

_Request Header_
```json
{
  "access_token": "<your access token>"
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
    "title": "<title_name>",
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2020-09-09T14:55:06.648Z",
    "updatedAt": "2020-09-09T15:30:58.690Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize User!"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

### PUT /tasks/:id
> Update tasks by ID

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "title": "<title to get insert into>"
}
```

_Response (200)_
```json
{
    "id": 1,
    "title": "<updated title>",
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2020-09-09T14:55:06.648Z",
    "updatedAt": "2020-09-09T15:30:58.690Z"
}
```

> Error response:
_Response (400 - Bad request)_
```json
{
  "message": "Please fill the title!"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /tasks/:id

> Delete tasks data by ID

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Response(200)_
```json

[
  {
    "id": "<selected id>",
    "title": "<tasks title>",
    "UserId": "<tasks UserId>",
    "CategoryId": "<tasks CategoryId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```
> Error response:
_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /categories

> Add new category

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "name": "<category name>"
}
```

_Response (200)_
```json
{
    "id": 1,
    "name": "<category name insert into>",
    "updatedAt": "2020-09-09T14:47:18.118Z",
    "createdAt": "2020-09-09T14:47:18.118Z"
}

```

_Response (400 - Bad Request)_
```json

{
  "message": "Bad Request"
}
```