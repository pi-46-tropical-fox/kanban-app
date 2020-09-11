const { Task } = require("../models");

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
			const all_tasks = await Task.findAll();
			return res.status(200).json(all_tasks);
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async update(req, res) {}

	static async delete(req, res) {}
}

module.exports = TaskController;