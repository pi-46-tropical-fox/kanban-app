const router = require("express").Router();
const UserController = require('../controller/UserController');
const TaskController = require('../controller/TaskController');
const { authentication, authorization } = require("../middleware/auth");
//======================================================================
//USER
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin);
//======================================================================
router.use(authentication);
//======================================================================
//CRUD - TASK
router.get('/task', TaskController.read);
router.post('/task', TaskController.create);
router.patch('/task/:id', authorization, TaskController.update);
router.patch('/task/:id/move', authorization, TaskController.move)
router.delete('/task/:id', authorization, TaskController.delete);
//======================================================================
module.exports = router;