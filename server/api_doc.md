REST API Kanban

ENDPOINT

POST Register

http://localhost:3000/register
BODY raw
{
    "email": "mario@mail.com",
    "password": "secret123"
}

POST Login
http://localhost:3000/login
BODY raw
{
    "email": "mario@mail.com",
    "password": "secret123"
}

POST Create a new kanban
http://localhost:3000/kanbans
HEADERS
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpb0BtYWlsLmNvbSIsImlhdCI6MTU5OTU5OTI0N30.J2dCo0D2JQmN7yDtSmQjaYEvAk9kdQuDG9KEOo6Krxo
BODY raw
{
    "title": "learn vue hacktiv8",
    "category": "backlog"
}

DEL Delete a kanban
http://localhost:3000/kanbans/1
HEADERS
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpb0BtYWlsLmNvbSIsImlhdCI6MTU5OTU5OTI0N30.J2dCo0D2JQmN7yDtSmQjaYEvAk9kdQuDG9KEOo6Krxo

GET Fetch all kanbans
http://localhost:3000/kanbans
HEADERS
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpb0BtYWlsLmNvbSIsImlhdCI6MTU5OTU5OTI0N30.J2dCo0D2JQmN7yDtSmQjaYEvAk9kdQuDG9KEOo6Krxo

GET Fetch kanban by id
http://localhost:3000/kanbans/2
HEADERS
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpb0BtYWlsLmNvbSIsImlhdCI6MTU5OTU5OTI0N30.J2dCo0D2JQmN7yDtSmQjaYEvAk9kdQuDG9KEOo6Krxo


PUT Update a kanban
http://localhost:3000/kanbans/2
HEADERS
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpb0BtYWlsLmNvbSIsImlhdCI6MTU5OTU5OTI0N30.J2dCo0D2JQmN7yDtSmQjaYEvAk9kdQuDG9KEOo6Krxo
BODY raw
{
    "title": "learn vue with hacktiv8",
    "category": "backlog"
}