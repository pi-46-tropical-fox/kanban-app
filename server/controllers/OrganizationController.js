const { Organization, Role, Project } = require('../models')

class OrganizationController{
    static async read(req, res, next){
        try {
            let organizations = await Organization.findAll({
                include: [
                    {
                        model: Role,
                        where: {
                            UserId: req.user.id
                        }
                    },
                    {
                        model: Project
                    },
                ]
            })

            res.status(200).json(organizations)
        } catch (e) {
            return next(e)
        }
    }

    static async show(req, res, next){
        try {
            //
        } catch (e) {
            return next(e)
        }
    }

    static async create(req, res, next){
        try {
            //
        } catch (e) {
            return next(e)
        }
    }
    
    static async update(req, res, next){
        try {
            //
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

module.exports = OrganizationController