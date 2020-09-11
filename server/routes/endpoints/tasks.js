const TaskController = require('../../controllers/TaskController')

const { authentication, authorization } = require('../../middleware/auth')

const endpoint = require('express').Router()

endpoint
.post('/', authentication, authorization, TaskController.create)
.put('/:id', authentication, authorization, TaskController.update) // update the task details
.delete('/:id', authentication, authorization, TaskController.destroy)

module.exports = endpoint