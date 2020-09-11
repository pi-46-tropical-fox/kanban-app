const CommentController = require('../../controllers/CommentController')

const { authentication, authorization } = require('../../middleware/auth')

const endpoint = require('express').Router()

endpoint
.post('/', authentication, authorization, CommentController.create)
.put('/:id', authentication, authorization, CommentController.update) // update the comment
.delete('/:id', authentication, authorization, CommentController.destroy)

module.exports = endpoint