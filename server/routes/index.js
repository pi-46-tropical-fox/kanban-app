const route = require('express').Router();
const UserController = require('../controllers/UserController');
const TaskController = require('../controllers/TaskController');
const {authentication,authorization} = require('../middlewares/auth');


route.get('/', (req,res) => {
    res.send("Welcome Kanban")
})

route.post('/register', UserController.register)
route.post('/login',UserController.login)
route.post("/googleLogin",UserController.googleLogin)
// authentication
route.use(authentication)
route.post('/tasks', TaskController.createTask) // create
route.get('/tasks', TaskController.showAll) // get all
// authorization
route.get('/tasks/:id', authorization,TaskController.showId) // get by id
route.put('/tasks/:id', authorization, TaskController.updateTask) // update
route.delete('/tasks/:id', authorization, TaskController.deleteTask) // delete


module.exports = route
