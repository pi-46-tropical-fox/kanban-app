
const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const { authorization } = require('../middlewares/auth')


router.get('/', CategoryController.show)
router.post('/add', authorization, CategoryController.add)
router.post('/delete/:id', authorization, CategoryController.delete)


module.exports = router