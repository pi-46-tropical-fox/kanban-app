const { Organization, UserOrganization } = require('../models')

class OrganizationController {
    static async showOrganization(req, res) {
        try {
            const conjunction = await UserOrganization.findAll({where: {UserId: req.userData.id}})
            if (!conjunction) {
                const organization = await Organization.findAll()
                let arr = []
                for (let i=0; i<conjunction.length;i++) {
                    for (let j=0; j<organization.length;j++) {
                        if (conjunction[i].OrganizationId==organization[j].id) {
                            arr.push({id: organization[j].id, name: organization[j].name})
                        }
                    }
                }
                console.log(arr);
                return res.status(200).json(arr)
            } else if (conjunction) {
                const organization = await Organization.findAll()
                return res.status(200).json(organization)
            }
        }
        catch(err) {
            console.log(err, '<<<<< Error Di Show Organization')
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async joinOrganization(req, res) {
        try {
            const { organizationId } = req.params
            const conjunction = await UserOrganization.create({UserId: req.userData.id, OrganizationId: organizationId})
            const organization = await Organization.findOne({where: {id: conjunction.OrganizationId}})
            return res.status(200).json(organization.name)
        }
        catch(err) {
            console.log(err, '<<<< error Join Organization')
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async addOrganization(req, res) {
        try {
            const { name } = req.body
            const organization = await Organization.create({name})
            await UserOrganization.create({UserId: req.userData.id, OrganizationId: organization.id})
            return res.status(201).json(organization)
        }
        catch(err) {
            console.log(err, '<<<< error Add Organization')
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = OrganizationController