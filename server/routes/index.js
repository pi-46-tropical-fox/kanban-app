const router = require("express").Router();
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const CategoryController = require("../controllers/CategoryController");
const { authentication, authorization } = require("../middlewares/auth");

//REGISTER
router.post("/register", UserController.register);

//LOGIN
router.post("/login", UserController.login);

//GOOGLE LOGIN
router.post("/googleLogin", UserController.googleLogin);

//ENDPOINTS TASK
router.get("/tasks", authentication, TaskController.show);
router.post("/tasks/:CategoryId", authentication, TaskController.add);
router.get("/tasks/:id", authentication, authorization, TaskController.find);
router.put("/tasks/:id", authentication, authorization, TaskController.edit);
router.delete(
  "/tasks/:id",
  authentication,
  authorization,
  TaskController.delete
);

router.patch('/tasks/:id', authentication, authorization, TaskController.move)

//ENDPOINTS CATEGORY
router.post("/categories", authentication, CategoryController.addCategory);

module.exports = router;
