const {Task} = require('../models');

class TaskController {
    static async createTask(req,res,next) {
        const {title,category} = req.body
        const UserId = req.userData.id 

        try {
            let create = await Task.create({
                title,category,UserId
            })
            res.status(201).json(create)
        } catch (err) {
            if(err.errors[0].type === 'Validation error') {
                res.status(400).json({message:err.errors[0].message}) 
            } else {
                res.status(500).json({message:err.message}) 
            }
            return next(err)
        }
    }

    static async showAll(req,res,next) {
        // const id = req.userData.id
        try {
            // let show = await Task.findAll({
            //     where: {
            //         UserId: id
            //     }
            // })
            let show = await Task.findAll()
            res.status(200).json(show)
        } catch (err) {
            
            return next(err)
        }
    }

    static async showId(req,res,next) {
        try {
            let task = await Task.findByPk(req.params.id)
            if(task) {
                res.status(200).json(task)
            } else {
               
                throw {message: "Task Not Found", statusCode:404}
            }
            
        } catch (err) {
            
            return next(err)
        }
    }

    static async updateTask(req,res,next) {
        const {title,category} = req.body
        const id = req.params.id

        try {
            let data = await Task.update({
                title,category
            }, {
                where: {
                    id: id
                }
            })
            
            if(data[0]) {
                res.status(200).json({message: "Succesfully update task"})
            } else {
                // res.status(404).json({message: "Not Found"})
                throw {message: "Task Not Found", statusCode:404}
            }
        } catch (err) {
            
            return next(err)
        }
    }

    static async deleteTask(req,res,next) {
        try {

            await Task.destroy({where: {id: req.params.id}})
            res.status(200).json({message:'Sukses delete'})
            
         } catch (err) {
            return next(err)
         }
    }

}

module.exports = TaskController