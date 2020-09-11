const { Task } = require('../models')

class Controller {
    static async createTask(req, res) {
        try {
            const CategoryId = req.params.categoryId
            const { title, description, due_date } = req.body

            const data = await Task.create({ UserId : req.userData.id, CategoryId, title, description, due_date })

            res.status(201).json(data)
        } catch(err) {
            console.log(err);
            res.status(500).json(`Interval Server Error`)
        }
    }

    static async findDetail(req, res) {
        try {
            const id = req.params.id
            const task = await Task.findOne({where : {id}})

            res.status(200).json(task)
        } catch(err) {
            res.status(500).json(`Interval Server Error`)
        }
    }

    static async deleteTask(req, res) {
        try { 
            const id = req.params.id
            await Task.destroy({where : {id}})

            res.status(204).json()
        } catch(err) {
            console.log(err);
            res.status(500).json(`Interval Server Error`)
        }
    }

    static async updateTaskPos(req, res) {
        try {
            console.log(req.body)
            const { CurrentCategory } = req.body
            const id = req.params.id

            const update = await Task.update({CategoryId : CurrentCategory}, {where : { id }})

            res.status(200).json(update)
        } catch(err) {
            console.log(err)
            res.status(500).json("Interval Server Error")
        }
    }
}

module.exports = Controller