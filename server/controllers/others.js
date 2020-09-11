const { Status } = require('../models')

class OtherController {
    static async getStatuses (req, res, next) {
        try {
            const statuses = await Status.findAll({
                attributes: ['name']
            })

            res.status(200).json(statuses)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    OtherController
}