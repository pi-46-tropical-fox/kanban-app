const { Task, UserOrganization } = require('../models')

class TaskController {
    static async showTasks(req, res) {
        try {
            // const conjunction = await UserOrganization.findAll({where: {OrganizationId: req.params.organizationId}})
            const tasks = await Task.findAll({where: {OrganizationId: req.params.organizationId}})
            return res.status(200).json(tasks)
        }
        catch(err) {
            console.log(err, '<<<< error show task')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async addTask(req, res) {
        const { title } = req.body
        try {
            const task = await Task.create({title, CategoryId: req.body.CategoryId, UserId: req.userData.id, OrganizationId: req.params.organizationId})
            // const conjunction = await UserOrganization.create({OrganizationId: req.params.organizationId, UserId: req.userData.id})
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
            // const conjunction = await UserOrganizationTask.findOne({where: {UserId: req.userData.id, OrganizationId: organizationId, TaskId: taskId}})
            // if (!conjunction ) {
                // }
            const task = await Task.findOne({where: {id: taskId, OrganizationId: organizationId}})
            if (!task) {
                    return res.status(400).json({message: 'Task Not Found'})
            }
            return res.status(200).json(task)
        }
        catch(err) {
            console.log(err, '<<<<< error Get Task By Id')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async updateTask(req, res) {
       const { taskId } = req.params
       const { title, CategoryId } = req.body
        try {
            // const conjunction = await UserOrganizationTask.findOne({where: {UserId: req.userData.id, OrganizationId: organizationId, TaskId: taskId}})
            // if (!conjunction) {
            //     return res.status(400).json({message: 'Task Not Found'})
            // }
            const task = await Task.update({title, CategoryId}, {where: {id: taskId}})
            if (!task) {
                return res.status(400).json({message: 'Task Not Found'})
        }
            return res.status(200).json(task)
        }
        catch(err) {
            console.log(err, '<<<< error Update task')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async deleteTask(req, res) {
        const { taskId } = req.params
        try {
            // const conjunction = await UserOrganizationTask.findOne({where: {UserId: req.userData.id, OrganizationId: organizationId, TaskId: taskId}})
            // if (!conjunction) {
            //     return res.status(400).json({message: 'Task Not Found'})
            // }
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