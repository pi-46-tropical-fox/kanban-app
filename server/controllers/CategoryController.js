const { Task, Category } = require("../models");

class CategoryController {

  static async addNewCategory(req, res, next) {
    try {
      const data = {
        name: req.body.name,
      };
      const category = await Category.create(data);
      return res.status(201).json(category);
    } catch(err) {
      console.log(err, "<<<< error in addNewCategory CategoryController");
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        order: [[ "createdAt", "ASC" ]]
      });
      return res.status(200).json(categories);
    } catch(err) {
      console.log(err, "<<<< error in getAllCategories CategoryController");
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const category = await Category.findByPk(+req.params.id);
      return res.status(200).json(category);
    } catch(err) {
      console.log(err, "<<<< error in getCategoryById CategoryController");
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const data = {
        name: req.body.name
      };
      const category = await Category.update(data, {
        where: {
          id: +req.params.id
        },
        returning: true
      });
      return res.status(201).json(category[1]);
    } catch(err) {
      console.log(err, "<<<< error in updateCategory CategoryController");
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const category = await Category.destroy({
        where: {
          id: +req.params.id
        }
      });
      return res.status(200).json({ message: "category has been deleted successfully" });
    } catch(err) {
      console.log(err, "<<<< error in addNewCategory CategoryController");
    }
  }

}

module.exports = CategoryController;