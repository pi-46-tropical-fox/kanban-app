const { Organization } = require('../models')
const { verifyToken } = require('../helpers/jwt')

class OrganizationController {
    static async showOrganization(req, res) {
        const organization = await Organization.findAll({where: {UserId: req.userData.id}})
        try {
            return res.status(200).json(organization)
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async addOrganization(req, res) {
        const { name } = req.body
        try {
            const organization = await Organization.create({name, UserId: req.userData.id})
            return res.status(201).json(organization)
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = OrganizationController