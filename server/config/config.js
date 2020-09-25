require('dotenv').config()

module.exports = {

  "development": {
    "username": "diezzy",
    "password": "postgres",
    "database": "kanban-002",
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
   }
}
