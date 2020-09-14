const IndexController = require("../controllers/IndexController");
const indexRouter = require("express").Router();

indexRouter.get("/", IndexController.showHome);

indexRouter.post("/register", IndexController.register);

indexRouter.post("/login", IndexController.login);

indexRouter.post("/googleLogin", IndexController.googleLogin);

module.exports = indexRouter;