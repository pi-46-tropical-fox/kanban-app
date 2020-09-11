# kanban-app
Membuat kanban web app

# Endpoints
```
- POST /register
- POST /login
- POST /googleLogin 

- GET /board/:orgId
- POST /board/:orgId

- GET /category/:boardId
- POST /category/:boardId

- GET /organization
- POST /organization
- GET /organization/my

- POST /task/:categoryId
- GET /task/:id
- DELETE /task/:id
- PUT /task/:id
- PUT /all/:id 
```

# POST /login
> Login
Request Header
```
Not Needed
```

Request Body
```
{
    "email": "<user's email>",
    "password": "<user's description>",

}
```

Response 200(Success)
```
{
    "access_token": <access_token>",
}
```

Response 401 - Unauthorized(Failed)
```
[   
    errors : {
        "message": "password / email salah"
    }
]
```
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# POST /register
> Register
Request Header
```
Not Needed
```

Request Body
```
{
    "email": "<user's email>",
    "password": "<user's description>",

}
```

Response 201 - Created(Success)
```
{
    "email": <user's email>",
}
```

Response 401 - Unauthorized(Failed)
```
[   
    errors : {
        "message": "password / email salah"
    }
]
```
Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# POST /googleLogin
> Google Login
Request Header
```
{
    id_token
}
```

Request Body
```
    Not Needed
```

Response 200 - (Success)
```
{
    "access_token": <access_token>",
}
```

Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# GET /board/:orgId
> Get All Board Belong To Certain Organization
Request Header
```
{
    < organization's id >
    access_token
}
```

Request Body
```
    Not Needed
```

Response 200 - (Success)
```
{
    {
    "id": 1,
    "name": "Example Name",
    "createdAt": "2020-09-11T14:22:22.426Z",
    "updatedAt": "2020-09-11T14:22:22.426Z",
    "OrganizationId": 1,
    "Categories": [
        {
            "id": 2,
            "title": "adad",
            "createdAt": "2020-09-11T14:24:22.157Z",
            "updatedAt": "2020-09-11T14:24:22.157Z",
            "BoardId": 1,
            "Tasks": [
                {
                    "id": 1,
                    "title": "Punya Si A",
                    "description": "example",
                    "due_date": null,
                    "createdAt": "2020-09-11T14:36:20.491Z",
                    "updatedAt": "2020-09-11T14:36:20.491Z",
                    "CategoryId": 2,
                    "UserId": 4,
                    "User": {
                        "id": 4,
                        "name": "ada",
                        "email": "a@a.com",
                        "createdAt": "2020-09-11T14:35:50.261Z",
                        "updatedAt": "2020-09-11T14:35:50.261Z"
                    }
                }
    ]
    }
}
```

Response 500 - Interval Server Error(Failed)
```
{
    "errors": [
        "Interval Server Error"
    ]    
}
``` 

# POST /board/:orgId
> Post Board
Request Header
```
{
    < organization's id >
    access_token
}
```

Request Body
```
{
    name : "Example Name"
}
```

Response 201 - Created (Success)
```
{
    "id": 2,
    "name": "Board",
    "OrganizationId": 1,
    "updatedAt": "2020-09-11T16:52:50.071Z",
    "createdAt": "2020-09-11T16:52:50.071Z"
}
```

Response 400 - Bad Request(Failed)
```
errors : {
    "message": "Invalid requests"
}
```

Response 500 - Interval Server Error(Failed)
```
"errors": {
    "Interval Server Error"
}    
``` 

# GET /category/:boardId
> Get All Category Belong To Certain Board
Request Header
```
{
    < board's id >
    access_token
}
```

Request Body
```
    Not Needed
```

Response 200 - (Success)
```
{
    "id": 2,
    "name": "Board",
    "createdAt": "2020-09-11T16:52:50.071Z",
    "updatedAt": "2020-09-11T16:52:50.071Z",
    "OrganizationId": 1,
    "Categories": []
}
```

Response 500 - Interval Server Error(Failed)
```
"errors": {
    "Interval Server Error"
}
``` 

# POST /category/:boardId
> Post Category
Request Header
```
{
    < board's id >
    access_token
}
```

Request Body
```
{
    name : "Example Name"
}
```

Response 201 - Created (Success)
```
{
    "id": 2,
    "name": "Board",
    "createdAt": "2020-09-11T16:52:50.071Z",
    "updatedAt": "2020-09-11T16:52:50.071Z",
    "OrganizationId": 1,
    "Categories": []
}
```

Response 400 - Bad Request(Failed)
```
errors : {
    "message": "Invalid requests"
}
```

Response 500 - Interval Server Error(Failed)
```
"errors": {
    "Interval Server Error"
}    
``` 

# GET /organization
> Get All Organization
Request Header
```
{
    access_token
}
```

Request Body
```
    Not Needed
```

Response 200 - (Success)
```
[
    {
        "id": 1,
        "name": "Hacktiv8",
        "description": "KAKAKAKA",
        "createdAt": "2020-09-11T14:20:57.389Z",
        "updatedAt": "2020-09-11T14:20:57.389Z"
    },
    {
        "id": 2,
        "name": "Purwadhika",
        "description": "KAKAKAKA",
        "createdAt": "2020-09-11T14:20:57.389Z",
        "updatedAt": "2020-09-11T14:20:57.389Z"
    }
]
```

Response 500 - Interval Server Error(Failed)
```
"errors": {
    "Interval Server Error"
}
``` 