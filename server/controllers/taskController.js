const {Task} = require('../models')

class TaskController{
    static show(req, res, next) {
        Task.findAll({
            where: {
                UserId: req.userData.id
            }
        })
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }
    
    static create(req, res, next) {
        let newTask = {
            title: req.body.title,
            UserId: req.userData.id
        }
        Task.create(newTask)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static edit(req, res, next) {
        let params = {
            status: req.body.status
        }
        Task.update(params, {where: {id: req.params.id}, returning: true})
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }

    static find(req, res, next) {
        Task.findByPk(req.params.id)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = TaskController