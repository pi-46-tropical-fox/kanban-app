
const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const { authorization } = require('../middlewares/auth')


router.get('/', CategoryController.show)
router.post('/', authorization, CategoryController.addCategory)
router.post('/:id', authorization, CategoryController.deleteCategory)


module.exports = router