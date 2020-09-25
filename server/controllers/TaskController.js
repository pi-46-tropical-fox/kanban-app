const { User, Task, Category } = require('../models')

class TaskController {
    static async showTasks(req, res) {
        try {
            let arr = []
            const category = await Category.findAll()
            const users = await User.findAll()
            const tasks = await Task.findAll({order: ['id']})
            for (let i=0;i<users.length;i++) {
                for (let j=0;j<tasks.length;j++) {
                    if (users[i].id == tasks[j].UserId) {
                        arr.push({
                            id: tasks[j].id,
                            title: tasks[j].title,
                            updatedAt: tasks[j].updatedAt,
                            CategoryId: tasks[j].CategoryId,
                            user: {
                                id: users[i].id,
                                email: users[i].email
                            }
                        })
                    }
                }
            }
            return res.status(200).json(arr)
        }
        catch(err) {
            console.log(err, '<<<< error show task')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async addTask(req, res) {
        const { title } = req.body
        try {
            const task = await Task.create({title, CategoryId: req.body.CategoryId, UserId: req.userData.id})
            return res.status(201).json(task)
        }
        catch(err) {
            console.log(err, '<<<< error Add Task');
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async getTaskById(req, res) {
        const { taskId } = req.params
        try {
            const task = await Task.findOne({where: {id: taskId}})
            if (!task) {
                    return res.status(400).json({message: 'Task Not Found'})
            } else {
                return res.status(200).json(task)
            }
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
            const task = await Task.update({title, CategoryId, updatedAt: new Date()}, {where: {id: taskId}})
            if (!task) {
                return res.status(400).json({message: 'Task Not Found'})
            } else {
                return res.status(200).json(task)
            }
        }
        catch(err) {
            console.log(err, '<<<< error Update task')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
    static async deleteTask(req, res) {
        const { taskId } = req.params
        try {
            const task = await Task.destroy({where: {id: taskId}})
            if (!task) {
                return res.status(400).json({message: 'Task Not Found'})
            } else {
                return res.status(200).json(task)
            }
        }
        catch(err) {
            console.log(err, '<<<<< error delete task')
            return res.status(500).json({message: 'Internal Sever Error'})
        }
    }
}

module.exports = TaskController;