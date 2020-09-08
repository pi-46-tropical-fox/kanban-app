const { Board, Organization } = require('../models')

class Controller {
    static async showAllBoard(req, res) {
        try {
            const dataBoard = await Organization.findOne({
                where : {
                    id : req.params.orgId
                },
                include: [ Board ]
            })

            res.status(200).json(dataBoard)
        } catch(err) {
            console.log(err);
            res.status(500).json(`Interval Server Error`)
        }
    }

    static async createBoard(req, res) {
        try {
            const id = req.params.orgId
            const { name } = req.body

            const board = await Board.create({ name, OrganizationId: id })

            res.status(201).json(board)
        } catch (err) {
            res.status(500).json('Interval Server Error')
        }
    }
}

module.exports = Controller