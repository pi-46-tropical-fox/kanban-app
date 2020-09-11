const ProjectController = require('../../controllers/ProjectController')

const { authentication, authorization } = require('../../middleware/auth')

const endpoint = require('express').Router()

endpoint
.get('/', authentication, authorization, ProjectController.read)
.post('/', authentication, authorization, ProjectController.create)
.get('/:id', authentication, authorization, ProjectController.show) // get Lists -> Tasks -> Comments and Assignees ('->' means children relation)
.put('/:id', authentication, authorization, ProjectController.update) // update the project's name
.delete('/:id', authentication, authorization, ProjectController.destroy)

module.exports = endpoint