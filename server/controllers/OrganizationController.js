const { Organization, User } = require('../models');

class OrganizationController {
    static async list(req, res, next) {
        try {
            const organizations = await Organization.findAll();

            return res.status(200).json(organizations);
        } catch (error) {
            next(error)
        }
    }

    static async byId(req, res, next) {
        try {
            return res.status(200).json(req.organization);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        const { name } = req.body;

        try {
            const organization = await Organization.create({ name });

            return res.status(201).json(organization);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const { name } = req.body;

        try {
            const organization = await Organization.update({ name }, { where: { id: req.organization.id }, returning: true });

            if (organization[0]) {
                return res.status(200).json(organization[1][0]);
            } else {
                throw { name: 'notFoundOrganization' }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrganizationController;