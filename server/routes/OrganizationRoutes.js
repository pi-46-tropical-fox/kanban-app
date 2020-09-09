const { authentication, authorizationOrganizationByUserId } = require('../middlewares/auth');
const OrganizationController = require('../controllers/OrganizationController');

const routes = require('express').Router();

routes.get('/organizations', authentication, OrganizationController.list);

routes.get('/organizations/:id', authentication, authorizationOrganizationByUserId, OrganizationController.byId);

routes.put('/organizations/:id', authentication, authorizationOrganizationByUserId, OrganizationController.update);

routes.post('/organizations', authentication, OrganizationController.create);

module.exports = routes;