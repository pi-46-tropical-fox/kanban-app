const {Task,User,Category} =require('../models')

class Controller {
    static list(req,res,next){
        console.log(req.user,"<<< GET Tasks")
        Category.findAll({include: { model : Task, include : { model : User , where:{organization:req.user.organization}}}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static add(req,res,next){
        let data = {
            title:req.body.title,
            UserId:req.user.id,
            CategoryId:req.params.CategoryId
        }
        Task.create(data)
        .then(data=>{
            console.log(data)
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static byId(req,res,next){
        Task.findOne({where:{id:req.user.id}})
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static edit(req,res,next){
        let params = {
            title:req.body.title,
        }
        let id = {where:{id:req.params.id}}
        Task.update(params,id)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static delete (req,res,next){
        Task.destroy({where:{id:req.params.id}})
        .then(data=>{
            console.log('success')
            return res.status(200).json({message:`deleted`})
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
    static editOne(req,res,next){
        console.log('aa')
        let params= {
            CategoryId:req.body.CategoryId
        }
        Task.update(params,{where:{id:req.params.id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = Controller