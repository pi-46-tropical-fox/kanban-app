const ListController = require('../../controllers/ListController')

const { authentication, authorization } = require('../../middleware/auth')

const endpoint = require('express').Router()

endpoint
.post('/', authentication, authorization, ListController.create)
.put('/:id', authentication, authorization, ListController.update) // update the comment
.delete('/:id', authentication, authorization, ListController.destroy)

module.exports = endpoint