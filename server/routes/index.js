const routes = require('express').Router();

const UserRoutes = require('./UserRoutes');
const OrganizationRoutes = require('./OrganizationRoutes');
const TaskRoutes = require('./TaskRoutes');

routes.use(UserRoutes);
routes.use(OrganizationRoutes);
routes.use(TaskRoutes);

module.exports = routes;