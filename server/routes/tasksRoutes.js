const router = require("express").Router();
const Controller = require("../controllers/TaskController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.post("/", Controller.create);
router.get("/", Controller.read);
router.put("/:TaskId", authorization, Controller.update);
router.delete("/:TaskId", authorization, Controller.delete);

module.exports = router;