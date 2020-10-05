const router = require('express').Router()
const userController = require('../controller/userController')
const Controller = require('../controller/controller')
const { authentication, authorization } = require('../middlewares/auth')

// Register & Login
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)

// Task
router.get('/task', authentication, Controller.showTask)
router.post('/task/:CategoryId', authentication, Controller.addTask)
router.get('/task/:id', authentication, authorization, Controller.findTask)
router.put('/task/:id', authentication, authorization, Controller.editTask)
router.patch('/task/:id',authentication, authorization, Controller.moveTask)
router.delete('/delete/:id', authentication, authorization, Controller.remove)

//category
router.get('/category', authentication, Controller.showCategory)
router.post('/category', authentication, Controller.addCategory)



module.exports = router