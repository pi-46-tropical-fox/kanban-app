const CategoryController = require("../controllers/categoryController")
const {authentication, authorization}= require("../middlewares/auth")

const router = require("express").Router()

router.post("/", CategoryController.addCategory)
router.delete("/:id", CategoryController.deleteCategory)
router.put("/:id",  CategoryController.editCategory)
router.get("/", CategoryController.getCategories)



module.exports = router