const routes = require(`express`).Router()
const {TaskCtr} = require(`../controllers`)
const {authentication, authorization} = require(`../middlewares/auth`)

routes.get(`/tasks`, authentication, TaskCtr.readTask)
routes.post(`/tasks/:categoryId`, authentication, TaskCtr.add)

routes.get(`/tasks/:id`, authentication, authorization, TaskCtr.findTaskById)
routes.put(`/tasks/:id`, authentication, authorization, TaskCtr.editTask)
routes.patch(`/movecategory/:id`, authentication, authorization, TaskCtr.updateCategory)
routes.delete(`/tasks/:id`, authentication, authorization, TaskCtr.delete)

module.exports = routes