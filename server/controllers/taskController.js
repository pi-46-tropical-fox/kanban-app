const {Task, User} = require('../models')

class TaskController{
    
    static async add(req,res,next){
        try{
            const { title, category } = req.body
            const newTask = await Task.create({
                title,
                category,
                UserId:req.userLogin.id
            })
            if(newTask){
                res.status(201).json({'New Task' : newTask})
            }

        } catch(err) {
            next(err)
        }
    }


    static async show(req,res,next){
        try{
            const tasks = await Task.findAll({
                include:{
                    model: User,
                    attributes:{
                        exclude:['password']
                    }
                }
            })
            if(tasks){
                res.status(200).json(tasks)
            }

        } catch(err){
            next(err)
        }

    }

    static async update(req,res,next){
        try {
            const id = req.params.id
            const { title, category } = req.body
            const putTask = await Task.update({
                title,
                category
            }, {
                where:{
                    id
                },
                returning:true
            })
            if(putTask){
                res.status(200).json({updatedTask : putTask[1]})
            }

        } catch(err) {
            next(err)
        }
    }

    static async delete(req,res,next){
        try {
            const id = req.params.id
            const delTask = await Task.destroy({
                where:{
                    id
                }
            })
            if(delTask){
                res.status(200).json({message:'Delete completed'})
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = TaskController