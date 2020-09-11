const CategoryController = require("../controllers/CategoryController");
const categoryRouter = require("express").Router();
const { authentication } = require("../middlewares/auth.js");

categoryRouter.post("/", authentication, CategoryController.addNewCategory);

categoryRouter.get("/", authentication, CategoryController.getAllCategories);

categoryRouter.get("/:id", authentication, CategoryController.getCategoryById);

categoryRouter.put("/:id", authentication, CategoryController.updateCategory);

categoryRouter.delete("/:id", authentication, CategoryController.deleteCategory);

module.exports = categoryRouter;