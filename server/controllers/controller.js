const {Task} = require('../models')

class Controller {
    static getTask(req,res) {
        Task.findAll()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => res.status(400).json(err))
    }
    static createTask(req,res) {
        const params = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.UserData.id
        }
        Task.create(params)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err))
    }
    static getTaskById(req,res) {
        Task.findByPk(req.params.id)
        .then(task => res.status(200).json(task))
        .catch(err => res.status(400).json(err))
    }
    static updateTask(req,res) {
        const params = {
            title: req.body.title,
            category: req.body.category
        }
        Task.update(params,{where:{id: req.params.id}})
        .then(result => res.status(200).json({msg:'successfully updated task'}))
        .catch(err => res.status(400).json(err))
    }
    static deleteTask(req,res) {
        Task.destroy({where:{id: req.params.id}})
        .then(result => res.status(200).json({msg: 'successfully deleted task'}))
        .catch(err => res.status(400).json(err))
    }

}

module.exports = Controller