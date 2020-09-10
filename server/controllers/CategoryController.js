const { Category } = require('../models');

class CategoryController {
    static async list(req, res, next) {
        try {
            const categories = await Category.findAll();

            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async byId(req, res, next) {
        try {
            const category = await Category.findByPk(req.params.id);

            if (category) {
                return res.status(200).json(category);
            } else {
                throw { name: 'notFoundCategory' };
            }
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        const { name } = req.body;
        try {
            const category = await Category.create({ name });

            return res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const { name } = req.body;
        try {
            const category = await Category.update(
                { name },
                {
                    where: {
                        id: req.params.id,
                    },
                    returning: true,
                }
            );

            if (category[0]) {
                return res.status(200).json(category[1][0]);
            } else {
                throw { name: 'notFoundCategory' };
            }
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const category = await Category.destroy({
                where: { id: req.params.id },
            });

            if (category) {
                return res.status(200).json(req.category);
            } else {
                throw { name: 'notFoundCategory' };
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController;