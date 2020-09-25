# kanban-app
Membuat kanban web app
Kanban-Sam

Firebase URL: https://kanbanapp-sam.web.app/#
<!-- Heroku URL: -->


# API Documentation
&nbsp;

## RESTful endpoints
```
  - POST /register
  - POST /login
  - POST /googleLogin
  - POST /organizations
  - GET /organizations
  - DELETE /organizations/:org_id
  - GET /tasks/:org_id
  - POST /tasks/:org_id
  - GET /tasks/org/:task_id
  - PUT /tasks/org/:task_id 
  - PATCH /tasks/org1/:task_id
  - PATCH /tasks/org/:task_id 
  - DELETE tasks/org/:task_id
  - POST /categories
```
### POST /register

> Create new user

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
    "name": "Fidelia",
    "email": "fidelia@mail.com",
    "password": "1234"
}
```

_Response (201 - Created)_
```
{
    "name": "Fidelia",
    "email": "fidelia@mail.com"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "Minimum password is four characters!"
  ]
}
```
---

### POST /login

> User login

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "fidelia@mail.com",
  "password": "fidelia"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<access_token>,
  "name": "Galuh Sekar",
  "id": 3
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    Invalid name or password
  ]
}
```
---

### POST /googleLogin
> Google signin
_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "google email" : <samuel@gmail.com>
}
```

_Response (200 - OK)_
```
{
  "access_token": "<access_token>,
  "name": "samuel",
  "id": <your user id>
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    Unauthorized 
  ]
}
```
---

### POST /organizations

> Create new organization

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "organization_name" : "Hacktiv8"
}
```

_Response (200 - OK)_
```
{
    "id": 14,
    "organization_name": "Hacktiv8",
    "updatedAt": "2020-09-11T16:01:33.159Z",
    "createdAt": "2020-09-11T16:01:33.159Z"
}
```

_Response (401 )_
```
{
  "errors": [
    "Organization name must not empty
  ]
}
```
---

### GET /organizations

> Show all organization

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
[
  
    {
        "id": 1,
        "organization_name": "Hacktiv8",
        "createdAt": "2020-09-09T09:47:34.213Z",
        "updatedAt": "2020-09-09T09:47:34.213Z"
    },
    {
        "id": 8,
        "organization_name": "asada",
        "createdAt": "2020-09-11T06:49:16.265Z",
        "updatedAt": "2020-09-11T06:49:16.265Z"
    }
]
```

_Response (404 - Not Found)_
```
{
  not needed
}
```
---

### DELETE /organizations/:org_id
> delete organization by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "id": <request id of todo for delete>
}
```

_Response (200 - OK)_
```
"Organization has been successfully removed"
```

_Response (404 - Not found)_
```
{
  "errors": [
    Organization not found
  ]
}
```
---

### GET /tasks/:org_id

> Get task by organization

_Request Header_
```
{
  "access_token": "<your access token>",
  "org_id": "<id organization>
}
```

_Request Body_
```
  not needed
```

_Response (200 - )_
```
[
  {
    "id": 1,
    "category_name": "Backlog",
    "createdAt": "2020-09-09T09:34:10.925Z",
    "updatedAt": "2020-09-09T09:34:10.925Z",
    "Tasks": [
        {
            "id": 30,
            "title": "asda",
            "UserId": 2,
            "CategoryId": 1,
            "OrganizationId": 1,
            "description": "asada",
            "createdAt": "2020-09-11T12:53:28.061Z",
            "updatedAt": "2020-09-11T12:53:28.061Z"
        },
        {
            "id": 26,
            "title": "adade",
            "UserId": 2,
            "CategoryId": 1,
            "OrganizationId": 1,
            "description": "adade",
            "createdAt": "2020-09-11T12:13:18.702Z",
            "updatedAt": "2020-09-11T12:13:18.702Z"
        },
        {
    "id": 4,
    "category_name": "Completed",
    "createdAt": "2020-09-09T09:34:10.925Z",
    "updatedAt": "2020-09-09T09:34:10.925Z",
    "Tasks": [
        {
            "id": 17,
            "title": "hahaha",
            "UserId": 2,
            "CategoryId": 4,
            "OrganizationId": 1,
            "description": "ass",
            "createdAt": "2020-09-11T11:46:57.870Z",
            "updatedAt": "2020-09-11T11:46:57.870Z"
        }
    ]
  }
]
    
```

_Response (404 - Bad Request)_
```
{
  "errors": [
    Organization not found!
  ]
}
```
---

### POST /tasks/org_id

> Add new task in organization

_Request Header_
```
 { 
  "access_token": "<your access token>",
  "org_id": "<id organization>
 }
```

_Request Body_
```

{
    "title": "",
    "description": "Tentu saja TIDAK!",
    "UserId": 2,
    "CategoryId": 2
}

```

_Response (200 - OK)_
```
not needed
```

_Response (400 - Bad Request)_
```
{  
  errors: [
    Invalid email or password
  ]

}
```
---


## GET /tasks/org/task_id
> Show task by id
_Request Header_
```
 { 
  "access_token": "<your access token>",
  "task_id": "<id task>
 }
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 26,
    "title": "adade",
    "UserId": 2,
    "CategoryId": 1,
    "OrganizationId": 1,
    "description": "adade",
    "createdAt": "2020-09-11T12:13:18.702Z",
    "updatedAt": "2020-09-11T12:13:18.702Z"
}
```

_Response (404 - Bad Request)_
```
{  
  errors: [
    task not found
  ]

}
```
---

## PUT /tasks/org/task_id 
> Edit task
_Request Header_
```
 { 
  "access_token": "<your access token>",
  "task_id": "<id task>
 }
```

_Request Body_
```
{
  "title": "adade",
  "description": "adade"
}
```

_Response (200 - OK)_
```
{
    "id": 26,
    "title": "adade",
    "UserId": 2,
    "CategoryId": 1,
    "OrganizationId": 1,
    "description": "adade",
    "createdAt": "2020-09-11T12:13:18.702Z",
    "updatedAt": "2020-09-11T12:13:18.702Z"
}
```

_Response (404 - Bad Request)_
```
{  
  errors: [
    title must not empty!
  ]

}
```
---


## PATCH /tasks/org1/:task_id
> move task forward by its owner

_Request Header_
```
{
  "access_token": "<your access token>"
  "task_id": "<your task id>"
}
```

_Request Body_
```
{
  "id": <request id of task for update>
}
```

_Response (200 - OK)_
```
  id: <task id>
  title: <task title>
  CategoryId: <task category>
  OrganizationId: <organization id>
  UserId: <owner task id
  description: <task description>
  
```

_Response (404 - Not found)_
```
{
  "errors": [
    Task not found
  ]
}
```
---

## PATCH /tasks/org/:task_id 
> move task backward by its owner

_Request Header_
```
{
  "access_token": "<your access token>"
  "task_id": "<your task id>"
}
```

_Request Body_
```
{
  "id": <request id of task for update>
}
```

_Response (200 - OK)_
```
  id: <task id>
  title: <task title>
  CategoryId: <task category>
  OrganizationId: <organization id>
  UserId: <owner task id
  description: <task description>
  
```

_Response (404 - Not found)_
```
{
  "errors": [
    Task not found
  ]
}
```
---

## DELETE tasks/org/task_id
> delete task by id

_Request Header_
```
{
  "access_token": "<your access token>"
  "task_id": "<your task id>"
}
```

_Request Body_
```
{
  "id": <request id of task for delete>
}
```

_Response (200 - OK)_
```
"Task has been successfully removed"
```

_Response (404 - Not found)_
```
{
  "errors": [
    Task not found
  ]
}
```
---
