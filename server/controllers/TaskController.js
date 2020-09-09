const { Task, User } = require('../models');

class TaskController {
    static async list(req, res, next) {
        const { id } = req.organization;
        try {
            const tasks = await Task.findAll({
                where: { OrganizationId: id },
                include: [User],
                order: [
                    ['createdAt', 'ASC'],
                ],
            });

            return res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    static async byId(req, res, next) {
        try {
            const task = req.task;

            if (task) {
                return res.status(200).json(task);
            } else {
                throw { name: 'notFoundTask' };
            }
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        const { title, description, category, due_date } = req.body;
        const { id, OrganizationId } = req.userData;
        try {
            const task = await Task.create({ title, description, category, due_date, UserId: id, OrganizationId });

            return res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const task = await Task.update(
                { ...req.body },
                {
                    where: {
                        id: req.params.id,
                    },
                    returning: true,
                }
            );

            if (task[0]) {
                return res.status(200).json(task[1][0]);
            } else {
                throw { name: 'notFoundTask' };
            }
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const task = await Task.destroy({
                where: { id: req.task.id },
            });

            if (task) {
                return res.status(200).json(req.task);
            } else {
                throw { name: 'notFoundTask' };
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TaskController;