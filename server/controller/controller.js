const { User, Task, Category } = require('../models')

class Controlller{
    static addCategory(req,res,next){
        const params = { name :req.body.name }
        Category.create(params)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static showCategory(req,res,next){
        Category.findAll()
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static showTask(req,res,next){
        Task.findAll({include: [User, Category]})
        .then(data =>{
            const newData = data.filter(datum => datum.User.organization === req.userData.organization)
            return newData
        })
        .then(data =>{
            const categoryName = {}
            data.forEach(datum =>{
                if(!categoryName[datum.Category.name]){
                    categoryName[datum.Category.name] = [datum]
                }else{
                    categoryName[datum.Category.name].push([datum])
                }
            })
            return res.status(201).json(categoryName)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static addTask(req,res,next){
        let params ={
            title : req.body.title,
            UserId : req.userData.id,
            CategoryId : req.params.CategoryId
        }
        Task.create(params)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static findTask(req,res,next){
        // console.log(req.params.taskId)
        Task.findOne({where:{id:req.params.id}})
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static editTask(req,res,next){
        console.log('masuk edit Task')
        let id = {where:{id: req.params.id}}
        console.log(req.params.taskId)
        const params = {
            title : req.body.title
        }
        Task.update(params,id)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }
}


module.exports = Controlller