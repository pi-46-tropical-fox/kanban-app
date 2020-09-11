const { Task } = require("../models");

const authorization = async (req, res, next) => {
	const TaskId = +req.params.TaskId;
	try {
		const task = await Task.findByPk(TaskId);
		if (task && task.UserId === req.user.id) {
			return next();
		}
		return res.status(403).json({ message: "The user is not authorized." });
	} catch(err) {
		return next(err);
	}
}

module.exports = authorization;