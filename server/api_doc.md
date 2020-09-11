# kanban-board
A kanban board to manage your tasks efficiently. This app has:
* CRUD Kanban
* Register and Login
* JSON formatted response

&nbsp;

## RESTful endpoints
```
 - POST /register
 - POST /login
 - POST /googleLogin
 - POST /categories
 - GET /categories
 - GET /categories/:id
 - PUT /categories/:id
 - DELETE /tasks/:id
 - POST /tasks/:CategoryId
 - GET /tasks
 - GET /tasks/:id
 - PUT /tasks/:CategoryId
 - PATCH /tasks/:CategoryId
 - DELETE /tasks/:id
```

### POST /register
> Register a new user to database

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<username to be inserted into database>",
  "email": "<email to be inserted into database>",
  "password": "<password to authenticate user credentials>"
  "organization" "<organization in which a user belongs into>"
}
```

_Response (201 - Created)_
```
{
  "access_token": "<your access token>",
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ] 
}
```
---
### POST /login

> Logged in an existing user and authenticate his/her credentials

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<user's email>",
  "password": "<user's password>",
  "organization" "<organization in which a user belongs into>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "email": "<your_email@provider.domain>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Invalid email or password"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### POST /googleLogin

> Logging in a user and/or registering a new user into database

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "avatar": "<your gogle profile picture>",
  "email": "<your google email>"
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "The verifyIdToken method requires an ID Token"
  ]
}
```

_Response(500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]  
}
```

#### _for more information about google oAuth please visit https://developers.google.com/gdata/docs/auth/overview_
---
### POST /categories

> Create a new category

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<the name of the category>",
}
```

_Response (201 - Created)_
```
{
  "id": "<a unique id given by postgres>",  
  "name": "<the name of the category>",
  "category": "<category of the task>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /categories

> Get all categories

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

_Response (200 - OK)_
```
[
  {
  "id": "<a unique id given by postgres>",  
  "name": "the name of the category",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
  },
  {
  "id": "<a unique id given by postgres>",  
  "name": "the name of the category",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /tasks/:id

> Get category based on id

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

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres>",  
  "name": "<the name of the category>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### POST /tasks/:CategoryId

> Create a new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<the title of the task>",
  "CategoryId": "<category of the task>",
  "UserId": "<id of the user>"
}
```

_Response (201 - Created)_
```
{
  "id": "<a unique id given by postgres>",  
  "title": "<the title of the task>",
  "CategoryId": "<category of the task>",
  "UserId": "<id of the user>"
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
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

_Response (200 - OK)_
```
[
  {
  "id": "<a unique id given by postgres>",  
  "title": "<the title of the task>",
  "CategoryId": "<category of the task>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
  },
  {
  "id": "<a unique id given by postgres>",  
  "title": "<the title of the task>",
  "CategoryId": "<category of the task>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### GET /tasks/:id

> Get task based on id

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

_Response (200 - OK)_
```
{
  "id": "<a unique id given by postgres>",  
  "title": "<the title of the task>",
  "CategoryId": "<category of the task>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
}
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### PUT /tasks/:id

> Update task based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<the title of the task>",
  "category": "<category of the task>"
}
```

_Response (200 - OK)_
```
[
  {
  "id": "<a unique id given by postgres>",  
  "title": "<the title of the task>",
  "CategoryId": "<category of the task>",
  "createdAt": "2020-08-31T06:30:49.914Z",
  "updatedAt": "2020-08-31T06:30:49.914Z" 
  }
]
```

_Response (400 - Bad request)_
```
{
  "errors": [
    "<error messages regarding constraints and validations>"
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---
### DELETE /tasks/:id

> Delete task based on id

_Request Header_
```
{
  "access_token": "<your acsess token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "Task has been deleted successfully"
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "User is not authenticated"
  ]
}
```

_Response (404 - Not found)_
```
{
  "errors": [
    "Not Found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "<some messages regarding server error>"
  ]
}
```
---