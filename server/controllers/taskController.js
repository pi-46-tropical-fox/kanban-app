const { Task } = require('../models')
const e = require('express')

class TaskController{
    static addTask(req, res, next) {
        let taskObj = {
            category: req.body.category,
            task: req.body.task,
            description: req.body.description,
            //To be updated using userData
            UserId: 3
        }

        Task.create(taskObj)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })

    }

    static getTask(req, res, next) {
        Task.findAll()
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static getTaskId(req, res, next) {
        Task.findByPk(req.params.id)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static updateTask(req, res, next) {
        let taskObj = {
            category: req.body.category,
            task: req.body.task,
            description: req.body.description,
        }

        Task.update(taskObj, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(!data) {
                    throw {message: 'Task not found!', statusCode: 401}
                }
                return res.status(200).json({message: "Update sucessfully!"})
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static deleteTask(req, res, next) {
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(!data) {
                    throw {message: 'Task not found!', statusCode: 401}
                }
                return res.status(200).json({message: "Delete sucessfully!"})
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

}

module.exports = TaskController