const TaskController = require('../controllers/TaskController')
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middlewares/auth')

const route = require('express').Router()

route.get('/', (req, res) => {
    res.send('Hello World!')
})

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googleLogin', UserController.googleLogin)

route.use(authentication)
route.get('/task', TaskController.show)
route.post('/task', TaskController.add)
route.get('/task/:id', authorization, TaskController.showById)
route.put('/task/:id', authorization, TaskController.update)
route.delete('/task/:id', authorization, TaskController.delete)

module.exports = route