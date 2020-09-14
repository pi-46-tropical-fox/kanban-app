const router = require ("express").Router ()
const TaskController = require ("../controllers/TaskController.js")
const {authentication} = require ("../middlewares/authentication.js")
const {authorization} = require ("../middlewares/authorization.js")

router.post ("/", authentication, TaskController.addTask)
router.get ("/", authentication, TaskController.getTask)

router.patch ("/:id/edit", authentication, authorization, TaskController.editTask)
router.patch ("/:id/move", authentication, authorization, TaskController.moveTask)
router.delete ("/:id", authentication, authorization, TaskController.deleteTask)

module.exports = router