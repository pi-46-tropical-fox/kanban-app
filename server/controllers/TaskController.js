const { Task, Category } = require("../models");

class TaskController {

  static async addNewTask(req, res, next) {
    try {
      const data = {
        title: req.body.title,
        CategoryId: +req.body.CategoryId,
        UserId: +req.userData.id
      };
      const task = await Task.create(data);
      return res.status(201).json(task);
    } catch(err) {
      console.log(err, "<<<< error in addNewTask TaskController");
      return next(err);
    }
  }

  static async getAllTasks(req, res, next) {
    try {
      const tasks = await Task.findAll({
        include: [ Category ],
        order: [[ "createdAt", "ASC" ]]
      });
      return res.status(200).json(tasks);
    } catch(err) {
      console.log(err, "<<<< error in getAllTasks TaskController");
      return next(err);
    }
  }

  static async getTaskbyId(req, res, next) {
    try {
      const task = await Task.findByPk(+req.params.id);
      return res.status(200).json(task);
    } catch(err) {
      console.log(err, "<<<< error in getTaskbyId TaskController");
      return next(err);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const data = {
        title: req.body.title,
        CategoryId: +req.body.CategoryId,
        UserId: +req.userData.id
      };
      const task = await Task.update(data, {
        where: {
          id: +req.params.id
        },
        returning: true
      });
      return res.status(201).json(task[1]);
    } catch(err) {
      console.log(err, "<<<< error in updateTask TaskController");
      return next(err);
    }
  }

  
  static async updateTaskCategory(req, res, next) {
    try {
      const data = {
        CategoryId: +req.body.CategoryId
      };
      const task = await Task.update(data, {
        where: {
          id: +req.params.id
        },
        returning: true
      });
      return res.status(201).json(task[1]);
    } catch(err) {
      console.log(err, "<<<< error in updateTask updateTaskCategory");
      return next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const task = await Task.destroy({
        where: {
          id: +req.params.id
        }
      });
      return res.status(200).json({ message: "task has been deleted successfully" });
    } catch(err) {
      console.log(err, "<<<< error in deleteTask TaskController");
      return next(err);
    }
  }
  
}

module.exports = TaskController;