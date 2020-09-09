const { Task } = require('../models')

class TaskController {
    static async showTasks(req, res) {
        try {
            const task = await Task.findAll({where: {organizationId: req.params.organizationId}})
            return res.status(200).json(task)
        }
        catch(err) {
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async addTask(req, res) {
        const { organizationId } = req.params
        const { title, category } = req.body
        try {
            const task = await Task.create({title, category, organizationId})
            return res.status(201).json(task)
        }
        catch(err) {
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async getTaskById(req, res) {
        const { taskId } = req.params
        try {
            const task = await Task.findOne({where: {id: req.params.taskId, organizationId: req.params.organizationId}})
            if (!task ) {
                return res.status(400).json({message: 'Task Not Found'})
            }
            return res.status(200).json(task)
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async updateTask(req, res) {
        const { taskId } = req.params
        const { title, category } = req.body
        try {
            const task = await Task.update({title, category}, {where: {id: req.params.taskId, organizationId: req.params.organizationId}})
            console.log(task);
            if (!task[0]) {
                return res.status(400).json({message: 'Task Not Found'})
            }
            return res.status(200).json(task)
        }
        catch(err) {
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async deleteTask(req, res) {
        const { taskId } = req.params
        try {
            const task = await Task.destroy({where: {id: taskId}})
            return res.status(200).json(task)
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
}

module.exports = TaskController;