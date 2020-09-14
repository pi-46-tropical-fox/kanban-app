const router = require ("express").Router ()
const CategoryController = require ("../controllers/CategoryController.js")

router.post ("/", CategoryController.addCategory)
router.get ("/", CategoryController.getCategory)

router.put ("/:id", CategoryController.editCategory)
router.delete ("/:id", CategoryController.deleteCategory)

module.exports = router