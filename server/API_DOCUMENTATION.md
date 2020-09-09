# Kanban App Server

This Kanban App server has:

- RESTful API endpoint for tasks (CRUD Operation)
- RESTful API endpoint for organizations (CRU Operation)
- JSON formatted request & response

## RESTful API endpoints

### POST /register

> Register a new user

_Request Body_

```json
{
    "username": "<user username>",
	"email": "<user email>",
	"password": "<user password>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<user id>",
    "username": "<user username>",
	"email": "<user email>",
    "OrganizationId": "<user organization id (default: 1 -> Hacktiv8)>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Email cannot null"
		},
		{
			"name": "is_null",
			"message": "Username cannot null"
		},
		{
			"name": "is_null",
			"message": "Password cannot null"
		},
		{
			"name": "minLength",
			"message": "Password must be minimal 6 characters"
		},
		{
			"name": "isEmail",
			"message": "Email format is invalid"
		},
		{
			"name": "is",
			"message": "Username can only contain alphanumeric character and special . _"
		},
		{
			"name": "notEmpty",
			"message": "Email cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Username cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Password cannot empty"
		},
		{
			"name": "not_unique",
			"message": "Email already registered"
		}
		{
			"name": "not_unique",
			"message": "Username already registered"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /login

> Login to app

_Request Body_

```json
{
	"email": "<user email>",
	"password": "<user password>"
}
```

_Response (200 - OK)_

```json
{
    "id": "<user id>",
    "username": "<user username>",
	"email": "<user email>",
    "OrganizationId": "<user organization id",
	"access_token": "<access_token>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "invalidLogin",
			"message": "Invalid email or password!"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /googlesign

> Login to app

_Request Headers_

```json
{
    "google_access_token": "<google access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
    "id": "<user id>",
    "username": "<user username>",
	"email": "<user email>",
    "OrganizationId": "<user organization id",
	"access_token": "<access_token>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "invalidLogin",
			"message": "Invalid email or password!"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /users/:id

> Get user by id

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<user id>",
    "username": "<user username>",
	"email": "<user email>",
    "OrganizationId": "<user organization id>",
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFoundUser",
			"message": "Error User not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized accessing this User"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### PUT /users/:id

> Update an user

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```json
{
    // Can be just one of them
    "username": "<user username>",
	"email": "<user email>",
	"password": "<user password>",
	"OrganizationId": "<user organization id>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<user id>",
    "username": "<user username>",
	"email": "<user email>",
    "OrganizationId": "<user organization id>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "minLength",
			"message": "Password must be minimal 6 characters"
		},
		{
			"name": "isEmail",
			"message": "Email format is invalid"
		},
		{
			"name": "is",
			"message": "Username can only contain alphanumeric character and special . _"
		},
		{
			"name": "notEmpty",
			"message": "Email cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Username cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Password cannot empty"
		},
		{
			"name": "not_unique",
			"message": "Email already registered"
		}
		{
			"name": "not_unique",
			"message": "Username already registered"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedUser",
			"message": "User not authorized accessing this User"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /tasks

> Create a new task

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```json
{
	"title": "<task title>",
	"description": "<task description>",
	"due_date": "<task due_date>",
	"category": "<task category>",
}
```

_Response (201 - Created)_

```json
{
	"id": "<task id>",
	"title": "<task title>",
    "description": "<task description>",
	"due_date": "<task due_date>",
	"category": "<task category>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Title cannot null"
		},
		{
			"name": "is_null",
			"message": "Description cannot null"
		},
		{
			"name": "is_null",
			"message": "Category cannot null"
		},
		{
			"name": "is_null",
			"message": "Due date cannot null"
		},
		{
			"name": "notPast",
			"message": "Due date cannot yesterday or past"
		},
		{
			"name": "notEmpty",
			"message": "Title cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Description cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Category cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Due date cannot empty"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedOrganization",
			"message": "User not authorized accessing this Organization"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /tasks

> Get all tasks

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"id": "<task id>",
		"name": "<task name>",
		"description": "<task description>",
		"category": "<task category>",
		"due_date": "<task due date>",
		"UserId": "<task user id>",
		"createdAt": "<task created at>",
		"updatedAt": "<task created at>"
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedOrganization",
			"message": "User not authorized accessing this Organization"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /tasks/:id

> Get task by id

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<task id>",
	"name": "<task name>",
	"description": "<task description>",
	"category": "<task category>",
	"due_date": "<task due date>",
	"UserId": "<task user id>",
	"createdAt": "<task created at>",
	"updatedAt": "<task created at>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFound",
			"message": "Error task not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedTask",
			"message": "User not authorized accessing this Task"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### PUT /tasks/:id

> Update a task

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```json
{
	"title": "<task title>",
	"description": "<task description>",
	"category": "<task category>",
	"due_date": "<task due date>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<task id>",
	"name": "<task name>",
	"description": "<task description>",
	"category": "<task category>",
	"due_date": "<task due date>",
	"UserId": "<task user id>",
	"createdAt": "<task created at>",
	"updatedAt": "<task created at>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFound",
			"message": "Error task not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedTask",
			"message": "User not authorized accessing this Task"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
			"name": "is_null",
			"message": "Title cannot null"
		},
		{
			"name": "is_null",
			"message": "Description cannot null"
		},
		{
			"name": "is_null",
			"message": "Status cannot null"
		},
		{
			"name": "is_null",
			"message": "Due date cannot null"
		},
		{
			"name": "notPast",
			"message": "Due date cannot yesterday or past"
		},
		{
			"name": "notEmpty",
			"message": "Title cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Description cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Status cannot empty"
		},
		{
			"name": "notEmpty",
			"message": "Due date cannot empty"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### DELETE /tasks/:id

> Delete a task

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<task id>",
	"name": "<task name>",
	"description": "<task description>",
	"category": "<task category>",
	"due_date": "<task due date>",
	"UserId": "<task user id>",
	"createdAt": "<task created at>",
	"updatedAt": "<task created at>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFound",
			"message": "Error task not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedTask",
			"message": "User not authorized accessing this Task"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### POST /organizations

> Create a new organization

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```json
{
	"name": "<organization name>"
}
```

_Response (201 - Created)_

```json
{
	"id": "<organization id>",
	"name": "<organization name>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
            "name": "is_null",
            "message": "Organization name cannot null"
        },
		{
            "name": "is",
            "message": "Organization name can only contain alphanumeric character and special - _"
        },
		{
            "name": "notEmpty",
            "message": "Organization name cannot empty"
        }
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### PUT /organizations/:id

> Update an organization

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```json
{
	"name": "<organization name>"
}
```

_Response (200 - OK)_

```json
{
	"id": "<organization id>",
	"name": "<organization name>"
}
```

_Response (400 - Bad request)_

```json
{
	"errors": [
		{
            "name": "is_null",
            "message": "Organization name cannot null"
        },
		{
            "name": "is",
            "message": "Organization name can only contain alphanumeric character and special - _"
        },
		{
            "name": "notEmpty",
            "message": "Organization name cannot empty"
        }
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedOrganization",
			"message": "User not authorized accessing this Organization"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /organizations

> Get all organizations

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
[
	{
		"id": "<organization id>",
		"name": "<organization name>"
	}
]
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedOrganization",
			"message": "User not authorized accessing this Organization"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```

### GET /organizations/:id

> Get organization by id

_Request Headers_

```json
{
    "access_token": "<access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```json
{
	"id": "<organization id>",
	"name": "<organization name>"
}
```

_Response (404 - Not Found)_

```json
{
	"errors": [
		{
			"name": "notFound",
			"message": "Error task not found"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthorizedOtganization",
			"message": "User not authorized accessing this Organization"
		}
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"errors": [
		{
			"name": "notAuthenticated",
			"message": "User not authenticated"
		}
	]
}
```

_Response (500 - Internal server error)_

```json
{
	"errors": [
		{
			"name": "InternalServerError",
			"message": "Internal server error"
		}
	]
}
```