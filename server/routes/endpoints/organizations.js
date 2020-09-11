const OrganizationController = require('../../controllers/OrganizationController')

const { authentication, authorization } = require('../../middleware/auth')

const endpoint = require('express').Router()

endpoint
.get('/', authentication, authorization, OrganizationController.read)
.post('/', authentication, authorization, OrganizationController.create)
.get('/:id', authentication, authorization, OrganizationController.show)
.put('/:id', authentication, authorization, OrganizationController.update)
.delete('/:id', authentication, authorization, OrganizationController.destroy)

module.exports = endpoint