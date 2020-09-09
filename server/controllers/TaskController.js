const { Task, UserOrganizationTask } = require('../models')

class TaskController {
    static async showTasks(req, res) {
        try {
            const conjunction = await UserOrganizationTask.findAll({where: {UserId: req.userData.id, OrganizationId: req.params.organizationId}})
            const task = await Task.findAll()
            return res.status(200).json({task, conjunction})
        }
        catch(err) {
            console.log(err, '<<<< error show task')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async addTask(req, res) {
        const { title, category } = req.body
        try {
            const task = await Task.create({title, category})
            const conjunction = await UserOrganizationTask.create({OrganizationId: req.params.organizationId, UserId: req.userData.id, TaskId: task.id})
            return res.status(201).json(task)
        }
        catch(err) {
            console.log(err, '<<<< error Add Task');
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async getTaskById(req, res) {
        const { taskId, organizationId } = req.params
        try {
            const conjunction = await UserOrganizationTask.findOne({where: {UserId: req.userData.id, OrganizationId: organizationId, TaskId: taskId}})
            if (!conjunction ) {
                return res.status(400).json({message: 'Task Not Found'})
            }
            const task = await Task.findOne({where: {id: req.params.taskId}})
            return res.status(200).json(task)
        }
        catch(err) {
            console.log(err, '<<<<< error Get Task By Id')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async updateTask(req, res) {
       const { taskId, organizationId } = req.params
       const { title, category } = req.body
        try {
            const conjunction = await UserOrganizationTask.findOne({where: {UserId: req.userData.id, OrganizationId: organizationId, TaskId: taskId}})
            if (!conjunction) {
                return res.status(400).json({message: 'Task Not Found'})
            }
            const task = await Task.update({title, category}, {where: {id: taskId}})
            return res.status(200).json(task)
        }
        catch(err) {
            console.log(err, '<<<< error Update task')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async deleteTask(req, res) {
        const { taskId, organizationId } = req.params
        try {
            const conjunction = await UserOrganizationTask.findOne({where: {UserId: req.userData.id, OrganizationId: organizationId, TaskId: taskId}})
            if (!conjunction) {
                return res.status(400).json({message: 'Task Not Found'})
            }
            const task = await Task.destroy({where: {id: taskId}})
            return res.status(200).json(task)
        }
        catch(err) {
            console.log(err, '<<<<< error delete task')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
}

module.exports = TaskController;