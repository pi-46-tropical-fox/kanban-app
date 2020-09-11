const taskRouter = require("express").Router();

const { authentication, authorization } = require("../middlewares/auth.js");
const TaskController = require("../controllers/TaskController.js");

taskRouter.post("/", authentication,TaskController.addNewTask);

taskRouter.get("/", authentication, TaskController.getAllTasks);

taskRouter.get("/:id", authentication, authorization, TaskController.getTaskbyId);

taskRouter.put("/:id", authentication, authorization, TaskController.updateTask);

taskRouter.patch("/:id", authentication, authorization, TaskController.updateTaskCategory);

taskRouter.delete("/:id", authentication, authorization, TaskController.deleteTask);

module.exports = taskRouter;