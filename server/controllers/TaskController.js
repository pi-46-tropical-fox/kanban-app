const { Task, User } = require('../models')

class TaskController {
    static addTask(req, res, next) {
        let taskObj = {
            title: req.body.title,
            UserId: req.userData.id
        }

        Task.create(taskObj)
        .then(task => {
            return res.status(201).json(task)
        })
        .catch(err => {
            return next(err)
        })
    }

    static showAllTask(req, res, next) {
        Task.findAll({
            include: [
                { model : User }
            ],
            order: [['id', 'ASC']]
        })
        .then(task => {
            return res.status(200).json(task)
        })
        .catch(err => {
            return next(err)
        })
    }

    static detailTask(req, res, next) {
        let id = Number(req.params.id)
        Task.findByPk(id)
        .then(task => {
            if (task) {
                return res.status(200).json(task)
            } else {
                throw {message: 'Task not found', statusCode: 404}
            }
        })
        .catch(err => {
            return next(err)
        })
    }

    static editTask(req, res) {
        let taskObj = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.userData.id
        }

        Task.findOne({
            where: {
                id: Number(req.params.id),
                UserId: taskObj.UserId
            }
        })
        .then(task => {
            if (task) {
                return task.update(taskObj, { returning:true })
            } else {
                throw {message: 'Task Not Found', statusCode: 404}
            }
        })
        .then(taskObj => {
            return res.status(200).json(taskObj)
        })
        .catch(err => {
            return next(err)
        })
    }

    static deleteTask(req, res) {
        let taskDelete
        let id = Number(req.params.id)

        Task.findByPk(id)
        .then(task => {
            // console.log(task);
            if (task) {
                taskDelete = task
                return task.destroy()
            } else {
                throw {message: 'Task not found', statusCode: 404}
            }
        })
        .then(() => {
            return res.status(200).json(taskDelete)
        })
        .catch(err => {
            return next(err)
        })
    }
}


module.exports = TaskController