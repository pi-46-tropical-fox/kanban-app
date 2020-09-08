const { Task } = require('../models')


class TaskController {

    static showTask(req, res, next) {
        Task.findAll()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            throw next(err)
        })
    }

    static addTask(req, res, next) {
        console.log(req.userData, 'ini req.userData')
        let params = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            UserId: req.userData.id
        }
        Task.create(params)
        .then(data => {
            return res.status(201).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }

    static oneTask(req, res, next) {
        Task.findByPk(req.params.taskId)
        .then(data => {
            return res.status(200).json({data})
        })
        .catch(err => {
            return next(err)
            // return res.status(500).json({ message: err.message })
        })
    }

    static updateTask(req, res, next) {
        console.log(req.params.taskId, '<<<<<<<<<<<reqparams')
        let params = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }
            Task.update(params, {
                where: {
                    id: req.params.taskId
                    }
            })
                .then(data => {
                    return res.status(200).json({data})
                })
                .catch(err => {
                    return next(err)
                    // return res.status(500).json({ message: err.message })
                })
    }

    static updateTaskCategory(req, res, next) {
        let params = {
            category: req.body.category
        }
            Task.update(params, {
                where: {
                    id: req.params.taskId
                    }
            })
                .then(data => {
                    return res.status(200).json({data})
                })
                .catch(err => {
                    return next(err)
                    // return res.status(500).json({ message: err.message })
                })
    }

    static deleteTask(req, res, next) {
        Task.destroy({ where: { id: req.params.taskId } })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
                // return res.status(500).json({ message: err.message })
            })
    }

}

module.exports = TaskController