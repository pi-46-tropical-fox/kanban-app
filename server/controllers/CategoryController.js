const { Category, Task } = require('../models')

class Controller {
    static async showAll(req, res) {
        try {
            const data = await Category.findAll({
                where : {
                    BoardId : req.params.boardId
                },
                include : [ Task ]
            })

            res.status(200).json(data)
        } catch(err) {
            res.status(500).json(`Interval Server Error`)
        }
    }

    static async createCategory(req, res) {
        try {
            const id = req.params.boardId
            const { title } = req.body

            const created = await Category.create({ title, BoardId : id })

            res.status(201).json(created)
        } catch (err) {
            console.log(err);
            res.status(500).json(`Interval Server Error`)
        }
    }
}

module.exports = Controller