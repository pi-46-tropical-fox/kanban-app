const RoleController = require('../../controllers/RoleController')

const { authentication, authorization } = require('../../middleware/auth')

const endpoint = require('express').Router()

endpoint
.post('/:taskId', authentication, authorization, RoleController.create)
.delete('/:id', authentication, authorization, RoleController.destroy)

module.exports = endpoint