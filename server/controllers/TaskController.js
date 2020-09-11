const { Task } = require('../models')

class TaskController{
    static async create(req, res, next){
        try {
            let data = {
                name: req.body.name,
                description: '',
                due_date: '',
                BoardId: req.body.BoardId,
                TaskId: req.params.taskId || null, // if it's a subtask
            }

            let task = await Task.create(data)

            res.status(201).json({ message: "Task created successfully." })
        } catch (e) {
            return next(e)
        }
    }
    
    static async update(req, res, next){
        try {
            let data = {
                name: req.body.name,
                description: '',
                due_date: '',
            }

            let task = Task.update(data, {where: {id: req.params.id}})

            res.status(200).json({ message: "Task updated successfully." })
        } catch (e) {
            return next(e)
        }
    }
    
    static async destroy(req, res, next){
        try {
            let task = Task.destroy(req.params.id)

            res.status(200).json({ message: "Task failed successfully." })
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = TaskController