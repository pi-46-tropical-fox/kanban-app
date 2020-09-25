# Koala-app

&nbsp;

## Endpoints
````
- POST /register
- POST /login
- POST /googleLogin
- POST /tasks/:id
- GET /tasks
- GET /tasks/:id
- DELETE /tasks/:id
````

## RESTful endpoints

### POST /register

> Create new user to database
_Request Header_
```
not needed
```

_Request Body_
```json
{
    "username": "Input username User",
    "email": "<email to get insert into>",
    "password": "<password to get insert into>",
}
```

_Response (200 - Created)_
```json
{
    "message": "ok"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Please input email format!, Password minimum 4 characters!"
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
    "access_token": "<access_token>"
}
```

_Response (401 - Bad Request)_
```json
{
    "message": "Invalid email or password"
}
```

### POST /google-login

> Login to kanban app with your google account
_Request Header_
```
not needed
```

_Request Body_
```json
{ 
    "username": "Input username User",
    "email": "<google email insert into>",
    "password": "google password insert into"
}
```

_Response (200)_
```json
{
    "token": "<access_token>"
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
                "organization": "<user organization>",
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

_Response (400)_
```json
{
  "message": "invalid input"
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /tasks/:id
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
    "title": "<title to get insert into>",
    "description": "<Task description>",
    "status": "<Task status>"
}
```

_Response (201 - Created)_
```json
  "message": "ok"
```
_Response (400 - Bad Request)_
```json
{
  "message": "Please fill the title!"
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