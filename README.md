#### API Demo : https://glacial-ocean-84777.herokuapp.com/
#### App Demo : https://bukanban2.web.app/

# Kanban Server
Kanban is an application to manage organization's tasks. This app has : 
* RESTful endpoint for task's CRUD operation
* authorization
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": <your name>,
  "email": <your email>,
  "password": <your password>
}
```

#### Success Response: ####
_Response (201 - Created)_
```
{
  "id": <id>,
  "name": <your name>,
  "email": <your email>,
  "password": <your encrypted password>,
  "updatedAt": <date>,
  "createdAt": <date>
}
```

#### Error Response: ####
_Response (400 - Bad Request)_
```
[
  "message": <detail message>
]
```

_Response (409 - conflict)_
```
{
  "message": "Email Already registered!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /login

> Process Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": <your email>,
  "password": <your password>
}
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "access_token": <your access token>
}
```

#### Error Response: ####

_Response (400 - Bad Request)_
```
[
  "message": <detail message>
]
```

_Response (404 - Not Found)_
```
{
  "message": "user not registered!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### POST /tasks

> Create new task

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
{
	"title": <title>
	"category": <category>
	"description": <description> 
}
```

#### Success Response: ####
_Response (201 - Created)_
```
{
  "id": <id>,
  "title": <title>,
  "description": <description> ",
  "category": <category>,
  "UserId": <UserId>,
  "updatedAt": <date>,
  "createdAt": <date>
}
```

#### Error Response: ####
_Response (400 - Bad Request)_
```
[
  "message": <message detail>
]
```
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /tasks

> Get User's tasks

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
[
	{
    "id": <id>,
    "title": <title>,
    "description": <description>,
    "category": <category>,
    "UserId": <UserId>,
    "Creator": <your name>
	},
	{
    "id": <id>,
    "title": <title>,
    "description": <description>,
    "category": <category>,
    "UserId": <UserId>,
    "Creator": <your name>
	},
]
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /tasks/:id

> Get task by task's id

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "id": <id>,
  "title": <title>,
  "description": <description>,
  "category": <category>,
  "UserId": <UserId>,
  "Creator": <your name>
},
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "task not found! "
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### PUT /tasks/:id

> Update task

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
{
	"title": <title> "
	"category": <category>
	"description": <description>"
}
```

#### Success Response: ####
_Response (200 - Created)_
```
{
  "message": "Update task success"
}
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "task not found! "
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```



### DELETE /tasks/:id

> Update task

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Request Body_
```
not needed
```

#### Success Response: ####
_Response (200 - Ok)_
```
{
  "message": "Delete task success"
}
```

#### Error Response: ####
_Response (401 - Unauthorized)_
```
{
  "message": "Not authenticated!"
}
```
_Response (403 - Forbidden)_
```
{
  "message": "Forbidden access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "task not found! "
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
