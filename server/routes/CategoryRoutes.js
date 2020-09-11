const { authentication, authorizationOrganizationByUserId, authorizationTaskByUserId, authorizationUserByUserId } = require('../middlewares/auth');
const CategoryController = require('../controllers/CategoryController');

const routes = require('express').Router();

routes.get('/categories', authentication, CategoryController.list);

routes.post('/categories', authentication, CategoryController.create);

routes.get('/categories/:id', authentication, CategoryController.byId);
routes.put('/categories/:id', authentication, CategoryController.update);
routes.delete('/categories/:id', authentication, CategoryController.delete);

module.exports = routes;