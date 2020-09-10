const { Task, User, Category } = require('../models')

class TaskController{
    static show(req, res){
        let sort = {
            include: [User, Category]
        }
        Task.findAll(sort)
        .then((data) => {
            const newData = data.filter(el => el.User.organization === req.userData.organization)
            return newData
        })
        .then(data => {
            const categoryName = {}
            data.forEach(i => {
                if (!categoryName[i.Category.name]) {
                    categoryName[i.Category.name] = [i]
                } else {
                    categoryName[i.Category.name].push(i)
                }
            });
            return res.status(200).json(categoryName)
        })

        .catch((err) => {
            return next(err)
        });
    }
    
    static create(req, res, next) {
        let newTask = {
            title: req.body.title,
            UserId: req.userData.id,
            CategoryId: req.params.CategoryId
        }
        Task.create(newTask)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let options = {
            where: {
                id: req.params.id
            },
            returning: true
        }
        Task.destroy(options)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }

    static edit(req, res, next) {
        let params = {
            title: req.body.title
        }
        Task.update(params, {where: {id: req.params.id}})
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }

    static find(req, res, next) {
        Task.findByPk(req.params.id)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }

    static edit(req,res,next){
        let params = {
            title: req.body.title
        }
        Task.update(params, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = TaskController