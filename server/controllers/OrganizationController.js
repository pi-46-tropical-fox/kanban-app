const { Organization, UserOrgazationTask } = require('../models')

class OrganizationController {
    static async showOrganization(req, res) {
        try {
            const organization = await Organization.findAll()
            return res.status(200).json(organization)
        }
        catch(err) {
            console.log(err, '<<<<< Error Di Show Organization')
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async addOrganization(req, res) {
        try {
            const { name } = req.body
            const { UserId } = req.userData.id
            const organization = await Organization.create({name})
            return res.status(201).json(organization)
        }
        catch(err) {
            console.log(err, '<<<< error Add Organization')
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = OrganizationController