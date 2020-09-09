const {Task,User} = require("../models");

class TaskController {
    static show (req,res,next){
        // res.send(req.userData)
        Task.findAll({
            include:[User],
            order: [['id','ASC']]
        })
        .then(task=>{
            return res.status(200).json(task)
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
    static showById (req,res,next){
        // res.send(req.userData)
        Task.findAll({
            include:[User],
            where:{
                id: req.params.id
            }
        })
        .then(task=>{
            return res.status(200).json(task)
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
    static add(req,res,next){
        // res.send(req.userData)
        Task.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            UserId: req.userData.id,
            createdAt: new Date,
            updatedAt: new Date
        })
        .then(user=>{
            return res.status(201).json(user)
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
    static update(req,res,next){
        Task.update({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        },{
            where:{
                id: req.params.id
            }
        })
        .then(user=>{
            return res.status(200).json({message: 'update success'})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
    static delete(req,res,next){
        Task.destroy({where:{id:req.params.id}})
        .then(()=>{
            return res.status(200).json({message: 'delete success'})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
}

module.exports = TaskController