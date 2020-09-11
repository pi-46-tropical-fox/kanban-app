# My Todos App Server
My Todos App is an application to manage your todos. This app has : 
* RESTful endpoint for todo's CRUD operation
* Register and Login
* JSON formatted response

&nbsp;
router.get('/', TaskController.showAllTask)
router.post('/:categoryId', TaskController.createNewTask)
router.get('/:taskId', authorization, TaskController.findTaskById)
router.put('/:taskId', authorization, TaskController.updateTask)
router.put('/:taskId/:categoryId', authorization, TaskController.moveTaskCategory)
router.delete('/:taskId', authorization, TaskController.deleteTask)

## Endpoints
``` 
- GET /categories
- GET /tasks
- POST /tasks/:categoryId
- GET /tasks/:taskId
- PUT /tasks/:taskId
- PUT /tasks/:taskId/:categoryId
- DELETE /tasks/:taskId
- POST /register
- POST /login
```

## RESTful endpoints
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

_Response (200)_
```
[
  {
    "id": 1
    "name": 'Backlog',
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  },
  {
    "id": 2
    "name": 'To Do',
    "createdAt": "2020-08-31T07:15:12.149Z",
    "updatedAt": "2020-08-31T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### GET /tasks

> Get all tasks
[
    {
        title: 'Layout kanban',
        description: 'Bikin layout kanban dengan css flex dan grid',
        CategoryId: 4,
        UserId: 1,
      "createdAt": "2020-08-31T07:15:12.149Z",
      "updatedAt": "2020-08-31T07:15:12.149Z",
    },
    {
        title: 'Vue di client',
        description: 'Setup vue di client',
        CategoryId: 4,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

### GET /tasks/:taskId

> Get task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
no needed
```

_Response (200 - Ok)_
```
    {
        title: 'Layout kanban',
        description: 'Bikin layout kanban dengan css flex dan grid',
        CategoryId: 4,
        UserId: 1,
      "createdAt": "2020-08-31T07:15:12.149Z",
      "updatedAt": "2020-08-31T07:15:12.149Z",
    }
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```

### GET /todos/:id

> Get todo by id

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
  "id": 1,
  "title": "Daily Challenge",
  "description": "Mengerjakan challenge harian",
  "due_date": "2020-08-31",
  "status": "incomplete",
  "createdAt": "2020-08-31T07:15:12.149Z",
  "updatedAt": "2020-08-31T07:15:12.149Z",
}

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

---
### PUT /tasks/:id

> Update todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<task title>",
  "description": "<task description>"
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "<updated task title>",
  "description": "<updated task description>"

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### DELETE /tasks/:taskId

> Delete todo by id

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

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /register

> Register your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "firstName": "<your first name>",
  "lastName": "<your last name>",
  "email": "<your email>"
  "password": "<your password>",
}
```

_Response (201 - created)_
```

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
### POST /login

> Login to your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<your registered email>"
  "password": "<your registered password>",
}
```

_Response (200 - ok)_
```

```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```
---
