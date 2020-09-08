# KANBAN
A simple website to manage orgnization's task.

&nbsp;

## RESTful endpoints
### POST /register

> Register new account

_Request Header_
```
{
 not needed
}
```

_Request Body_
```
{
  "email":"<your email>"
  "password":"<your password>",
  "organization":"<your organization>",
  }
```

_Response (201)_
```
  {
    "id":"<your id>"
    "email":"<your email>"
    "organization":"<your organization>",
  }
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /login

> Login account

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email":"<your email>",
  "password":"<your password>"
  }
```

_Response (200)_
```
  {
    "access_token": "<your access token>"
  }
```

_Response (400)_
```
{
  "message": "Email/Password is invalid"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /task

> Show all tasks of user's organization

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
{
    "tasks": [
        {
            "id": 3,
            "title": "Add new API",
            "description": "MEnambhakan hal baru",
            "UserId": 1,
            "organization": "Hacktiv8",
            "createdAt": "2020-09-08T06:33:35.854Z",
            "updatedAt": "2020-09-08T06:33:35.854Z"
        }
    ]
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /task

> Create new personal task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<your title>",
  "description": "<your description>",
  "category": "<your category>"
}
```

_Response (201 - Created)_
```
{
    "data": {
        "id": 4,
        "title": "Belajar membuat REST API",
        "description": "Membuat KANBAN",
        "UserId": 1,
        "organization": "Hacktiv8",
        "updatedAt": "2020-09-08T06:48:40.947Z",
        "createdAt": "2020-09-08T06:48:40.947Z"
    }
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### PUT /task/:id

> update specific task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<your title>",
  "description": "<your description>"
}
```

_Response (200)_
```
{
    "message": "Data has been successfully updated."
}

```

_Response (400 - Bad Request)_
```
{
  "message": "User is not authorized"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE /task/:id

> Delete task

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
{
    "message": "Data has been successfully deleted."
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---