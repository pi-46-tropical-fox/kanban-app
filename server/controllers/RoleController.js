const { Role } = require('../models')

class RoleController{
    static async create(req, res, next){
        try {
            let data = {
                UserId: req.body.UserId,
                OrganizationId: req.params.OrganizationId,
                name: req.body.name,
            }

            let role = Role.create(data)

            res.status(201).json({ message: "Collaborator has been added successfully.", data: role })
        } catch (e) {
            return next(e)
        }
    }
    
    static async destroy(req, res, next){
        try {
            //
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = RoleController