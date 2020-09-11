const AssigneeController = require('../../controllers/AssigneeController')

const { authentication, authorization } = require('../../middleware/auth')

const endpoint = require('express').Router()

endpoint
.post('/:taskId', authentication, authorization, AssigneeController.create)
.delete('/:id', authentication, authorization, AssigneeController.destroy)

module.exports = endpoint