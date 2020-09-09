const { authentication, authorizationOrganizationByUserId, authorizationTaskByUserId, authorizationUserByUserId } = require('../middlewares/auth');
const TaskController = require('../controllers/TaskController');

const routes = require('express').Router();

routes.get('/tasks', authentication, authorizationOrganizationByUserId, TaskController.list);

routes.post('/tasks', authentication, authorizationOrganizationByUserId, TaskController.create);

routes.get('/tasks/:id', authentication, authorizationTaskByUserId, TaskController.byId);
routes.put('/tasks/:id', authentication, authorizationTaskByUserId, TaskController.update);
routes.delete('/tasks/:id', authentication, authorizationTaskByUserId, TaskController.delete);

module.exports = routes;