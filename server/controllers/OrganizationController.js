const { Organization, Membership } = require('../models')

class Controller {
    static async createOrganization(req, res) {
        try {
            const { name, description } = req.body
            const created = await Organization.create({ name, description })
            const member = await Membership.create({ UserId : req.userData.id, OrganizationId : created.id, role : 'Owner' })

            res.status(201).json(member)
        } catch (err) {
            console.log(err)
            res.status(500).json(`Interval Server Error`)
        }
    }

    static async showAllOrganization(req, res) {
        try {
            const list = await Organization.findAll()

            res.status(200).json(list)
        } catch (err) {
            console.log(err);
            res.status(500).json(`Interval Server Error`)
        }
    }

    static async ownOrganization(req, res) {
        try {
            const list = await Membership.findAll({
                attributes : ['role'],
                where : {
                    UserId : req.userData.id
                },
                include : [ Organization ]
            })

            res.status(200).json(list)
        } catch(err) {
            console.log(err);
            res.status(500).json(`Interval Server Error`)
        }
    }
}

module.exports = Controller