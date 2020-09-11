const routes = require('express').Router();

const UserRoutes = require('./UserRoutes');
const OrganizationRoutes = require('./OrganizationRoutes');
const TaskRoutes = require('./TaskRoutes');
const CategoryRoutes = require('./CategoryRoutes');

routes.use(UserRoutes);
routes.use(OrganizationRoutes);
routes.use(TaskRoutes);
routes.use(CategoryRoutes);

module.exports = routes;