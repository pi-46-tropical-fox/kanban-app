const { Kanban } = require('../models')

class KanbanController {

  static createKanban(req, res, next) {
    console.log(req.userData, "<<< ini userData");
    const kanban = {
      title: req.body.title,
      category: req.body.category,
      UserId: req.userData.id
    }
    console.log(kanban, "<<< ini kanban");
    Kanban
      .create(kanban)
      .then(kanban => {
        return res.status(201).json(kanban);
      })
      .catch(err => {
        return next(err);
      })
  }

  static getKanban(req, res, next) {
    Kanban
      .findAll()
      .then(kanbans => {
        return res.status(200).json(kanbans);
      })
      .catch(err => {
        return next(err)
      })
  }

  static getKanbanById(req, res, next) {
    Kanban
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(kanban => {
        res.status(200).json(kanban);
      })
      .catch(err => {
        return next(err);
      })
  }

  static updateKanban(req, res, next) {
    const { title, category} = req.body;
    Kanban
      .update(
        {
          title,
          category
        },
        {
          where: {
            id: req.params.id
          }
        })
      .then(result => {
        if(!result[0]) {
          throw {message: "book not found", statusCode: 400}
        } else {
          res.status(201).json({message: "successfully update Kanban"})
        }
      })
      .catch(err => {
        return next(err)
      })
  }

  static deleteKanban(req, res, next) {
    Kanban
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        if(!result) {
          throw {message: "failed to delete", statusCode: 400}
        } else {
          res.status(200).json({message: "successfully delete"});
        }
      })
      .catch(err => {
        return next(err);
      })
  }
}

module.exports = KanbanController;