const routes = require('express').Router()
const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')
const categoriesController = require('../controllers/categoriesController')
const {authentication ,authorization} = require('../middleware/auth')

routes.post('/register',userController.register)
routes.post('/login',userController.login)
routes.post('/googlelogin',userController.googleLogin)

routes.get('/tasks',authentication,taskController.list)
routes.post('/tasks/:CategoryId',authentication,taskController.add)
routes.post('/categories',authentication,categoriesController.addCat)

routes.get('/tasks/:id',authentication,authorization,taskController.byId)
routes.put('/tasks/:id',authentication,authorization,taskController.edit)
routes.patch('/tasks/:id',authentication,authorization,taskController.editOne)
routes.delete('/tasks/:id',authentication,authorization,taskController.delete)




module.exports = routes