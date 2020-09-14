const TaskController = require("../controllers/taskController")
const {authentication, authorization}= require("../middlewares/auth")
const router = require("express").Router()

router.get("/", TaskController.getTask)      //showing tasks 
// router.get("/:id",)

router.post("/", TaskController.addTask)  //add new task
router.patch("/:id/title", authorization ,TaskController.editTitleTask) //edit title data
router.patch("/:id/category",authorization , TaskController.editCategoryTask) //edit category

router.delete("/:id", authorization , TaskController.deleteTask) //delete a task



module.exports = router