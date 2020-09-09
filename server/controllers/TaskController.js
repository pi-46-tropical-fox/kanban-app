const { Task, User, Category } = require('../models');

class TaskController {
    static show(req,res,next){
        let sort = {
            include: [User, Category]
        }
        Task.findAll(sort)
        .then((data) => {
            const newData = data.filter(el => el.User.organization === req.userData.organization)
            console.log(newData, 'INI NEW DATAAAAAAAA <<<<<');
            return newData
        })
        .then(data => {
            const categoryName = {}
            data.forEach(el => {
                if (!categoryName[el.Category.name]) {
                    categoryName[el.Category.name] = [el]
                } else {
                    categoryName[el.Category.name].push(el)
                }
            });
            return res.status(200).json(categoryName)
        })
        
        .catch((err) => {
            return next(err)
        });
    }
    static add(req,res,next){
        let params = {
            title: req.body.title,
            UserId: req.userData.id,
            CategoryId: req.params.CategoryId
        }
        Task.create(params)
        .then((data) => {
          return res.status(201).json(data)  
        }).catch((err) => {
            return next(err)
        });
    }
    static find(req,res,next){
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
    static delete(req,res,next){
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

}

module.exports = TaskController