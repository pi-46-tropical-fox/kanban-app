const { Task, User } = require("../models");

class TaskController {
	static async create(req, res) {
		const { title, category, description } = req.body;
		const UserId = req.user.id;
		try {
			const new_task = await Task.create({ title, category, description, UserId });
			return res.status(201).json(new_task);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async read(req, res) {
		try {
			const all_tasks = await Task.findAll({ include: [ User ] });
			return res.status(200).json(all_tasks);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async update(req, res) {
		const TaskId = +req.params.TaskId;
		const { title, category, description } = req.body;
		try {
			const updated_task = await Task.update({ title, category, description }, {
				where: {
					id: TaskId
				},
				returning: true
			});
			return res.status(200).json(updated_task[1][0]);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async delete(req, res) {
		const TaskId = +req.params.TaskId;
		try {
			const deleted_task = await Task.findByPk(TaskId, {
				include: [ User ]
			});
			const result = await Task.destroy({
				where: {
					id: TaskId
				}
			});
			return res.status(200).json(deleted_task);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = TaskController;