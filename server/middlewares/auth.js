const { verifyToken } = require('../helpers/jwt');
const { Task, User, Organization } = require('../models');

const authentication = async (req, res, next) => {
    const { access_token } = req.headers;

    try {
        const userData = verifyToken(access_token);
        const user = await User.findByPk(userData.id);
        if (user) {
            req.userData = userData;
            next();
        } else {
            throw { name: 'notAuthenticated' };
        }
    } catch (error) {
        next(error);
    }
};

const authorizationTaskByUserId = async (req, res, next) => {
    try {
        const { id } = req.userData;
        const task = await Task.findOne({ where: { id: req.params.id } });

        if (!task) {
            throw { name: 'notFoundTask' };
        } else if (task && task.UserId === id) {
            req.task = task;
            next();
        } else {
            throw { name: 'notAuthorizedTask' };
        }
    } catch (error) {
        next(error);
    }
};

const authorizationOrganizationByUserId = async (req, res, next) => {
    try {
        const { OrganizationId } = req.userData;
        const organization = await Organization.findOne({ where: { id: OrganizationId } });

        if (!organization) {
            throw { name: 'notFoundOrganization' };
        } else if (organization && organization.id === OrganizationId) {
            req.organization = organization;
            next();
        } else {
            throw { name: 'notAuthorizedOrganization' };
        }
    } catch (error) {
        next(error);
    }
}

const authorizationUserByUserId = async (req, res, next) => {
    try {
        const { id } = req.userData;
        const user = await User.findOne({ where: { id: req.params.id } });

        if (!user) {
            throw { name: 'notFoundUser' };
        } else if (user && user.id === id) {
            req.user = user;
            next();
        } else {
            throw { name: 'notAuthorizedUser' };
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { authentication, authorizationTaskByUserId, authorizationOrganizationByUserId, authorizationUserByUserId };
