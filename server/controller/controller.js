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
            return res.status(200).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static showTask(req,res,next){
        Category.findAll({include:{model:Task,include:{model:User , where:{organization:req.userData.organization}}}})
        .then(data =>{
           return res.status(200).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static addTask(req,res,next){
        let params ={
            title : req.body.title,
            description: req.body.description,
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
            return res.status(200).json(data)
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
            title : req.body.title,
            description : req.body.description
        }
        Task.update(params,id)
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }

    static moveTask(req,res,next){
        console.log('ini masuk movetask')
        let id = {where:{id: req.params.id}}
        console.log(req.params.id)
        const params = {
            CategoryId : req.body.CategoryId
        }
        console.log(params)
        Task.update(params,id)
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            console.log(err)
            return next(err)
        })
    }

    static remove(req,res,next){
        let id = {where:{id: req.params.id}}
        Task.destroy(id)
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            return next(err)
        })
    }
}


module.exports = Controlller