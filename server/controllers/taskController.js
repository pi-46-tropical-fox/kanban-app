const {Task,User,Category} =require('../models')

class Controller {
    static list(req,res){
        console.log(req.user,"<<< GET Tasks")
        Category.findAll({include: { model : Task, include : { model : User , where:{organization:req.user.organization}}}})
        .then(data=>{
            // const newData = data.filter(i=>i.User.organization === req.user.organization)
            // console.log(newData)
            // return newData
            res.status(200).json(data)
        })
        // .then(data=>{
        //     const catName = {}
        //     data.forEach(i=>{
        //         if (!catName[i.Category.name]){
        //             catName[i.Category.name] = [i]
        //         }else{
        //             catName[i.Category.name].push(i)
        //         }
        //     })
        //     console.log(catName)
        //     return res.status(200).json(catName)
           
        // })
        .catch(err=>{
            console.log(err)
            return res.status(400).json(err)
        })
    }
    static add(req,res){
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
            console.log(err)
        })
    }
    static byId(req,res){
        Task.findOne({where:{id:req.user.id}})
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            return res.status(400).json(err)
        })
    }
    static edit(req,res){
        console.log(req.body)
        let params = {
            title:req.body.title,
        }
        let id = {where:{id:req.params.id}}
        Task.update(params,id)
        .then(data=>{
            console.log('a')
            return res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err)
            return res.status(400).json(err)
        })
    }
    static delete (req,res){
        Task.destroy({where:{id:req.params.id}})
        .then(data=>{
            console.log('success')
            return res.status(200).json({message:`deleted`})
        })
        .catch(err=>{
            console.log(err)
            return res.status(400).json(err)
        })
    }
}

module.exports = Controller