const UserController = require('../controllers/UserController');
const { authentication, authorizationUserByUserId } = require('../middlewares/auth');

const routes = require('express').Router();

routes.post('/register', UserController.register);

routes.post('/login', UserController.login);

routes.post('/googleSign', UserController.googleLogin);

routes.put('/users/:id', authentication, authorizationUserByUserId, UserController.update);

routes.get('/users/:id', authentication, authorizationUserByUserId, UserController.byId);

module.exports = routes;
