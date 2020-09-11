const router = require('express').Router()
const userController = require('../controller/userController')
const Controller = require('../controller/controller')
const { authentication, authorization } = require('../middlewares/auth')

// Register & Login
router.post('/register', userController.register)
router.post('/login', userController.login)

// Task
router.get('/task', authentication, Controller.showTask)
router.post('/task/:CategoryId', authentication, Controller.addTask)
router.get('/task/:id', authentication, authorization, Controller.findTask)
router.put('/task/:id', authentication, authorization, Controller.editTask)
router.patch('/task/:id',authentication, authorization, Controller.moveTask)

//category
router.get('/category', authentication, Controller.showCategory)
router.post('/category', authentication, Controller.addCategory)


/**
 * bikin method patch /task/:taskId
 * didalem controller, di client maanfatin /get category untuk select option
 * di modal kasih select option 
 * yang di display 
 * <select v-model = 'category'>
 * option di v-for category in categories
 * <option value = category.id>category.name</option>
 * </select>
 */

module.exports = router