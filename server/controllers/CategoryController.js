const { Category, Task, Board, User } = require('../models');

class Controller {
    static async showAll(req, res, next) {
        try {
            const data = await Board.findOne({
                where : {
                    id : req.params.boardId
                },
                include : [{
                    model: Category,
                    include : [{
                        model : Task,
                        order : ['createdAt', 'DESC'],
                        include : [{
                            model : User,
                            attributes : {
                                exclude : ['password']
                            }
                        }]
                    }]
                }],
            })

            res.status(200).json(data)
        } catch(err) {
            next(err)
        }
    }

    static async createCategory(req, res, next) {
        try {
            const id = req.params.boardId
            const { title } = req.body

            const created = await Category.create({ title, BoardId : id })

            res.status(201).json(created)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller