const router = require ("express").Router ()
const TaskController = require ("../controllers/TaskController.js")

router.post ("/", TaskController.addTask)
router.get ("/", TaskController.getTask)

router.put ("/:id", TaskController.editTask)
router.delete ("/:id", TaskController.deleteTask)

module.exports = router