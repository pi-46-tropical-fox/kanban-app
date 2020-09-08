# Kanban App Server

## List of available endpoints:
```
- POST /register
- POST /login
- POST /tasks
- GET /tasks
- GET /tasks/:id
- PUT /tasks/:id
- DELETE /tasks/:id
```

## POST /register
> Register new user

_Request_:

- data:
```json
{
  "name": "stirng",  
  "email": "string",
  "password": "string"
}
```

_Response_:

- status: 201
- body: 
```json
{
  "name": "name from input",
  "email": "email from input"
}
```
- status: 400
```json
{
  "name": "name must be filled",  
  "email": "email must be filled",
  "password": "password must be filled"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## POST /login
> Login user

_Request_:

- data:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "name": "name from input",
  "email": "email from input",
  "access_token": "access_token"
}
```
- status: 400
```json
{  
  "email": "email must be filled",
  "password": "password must be filled"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## POST /task
> add new task

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 201
- body: 
```json
{
  "title": "string",
  "category": "category"
}
```
- status: 400
```json
{  
  "title": "title must be filled",
  "category": "category must be filled"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## GET /task
> show all task

_Request_:

- header:
```json
{
    "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "title": "string",
  "category": "category"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## GET /task/:id
> show task by id

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "id": "interger",    
  "title": "string",
  "category": "category",
  "UserId": "integer"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## PUT /task/:id
> edit task

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```

_Response_:

- status: 200
- body: 
```json
{
  "id": "interger",    
  "title": "string",
  "category": "category",
  "UserId": "integer"
}
```
- status: 400
```json
{  
  "title": "title must be filled",
  "category": "category must be filled"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```

## DELETE /task/:id
> delete task

_Request_:

- header:
```json
{
  "access_token": "access_token"
}
```
- params:
```json
{
  "id": "integer"
}
```

_Response_:

- status: 200
- body:
```json
{
    "message": "Successfully delete task"
}
```
- status: 400
```json
{  
  "message": "Failed delete task"
}
```
- status: 403
```json
{  
  "message": "No access"
}
```
- status: 500
```json
{
  "message": "Internal Server Error"
}
```