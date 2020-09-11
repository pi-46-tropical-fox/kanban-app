const { Task, TaskCategory, User } = require('../models')

class TaskController{
    static async getTasks(req, res){
        const results = await Task.findAll({include : [TaskCategory, {
            model : User,
            attributes : ['email', 'name']
        }]})

        res.status(200).json(results)
    }

    static async getCategories(req, res){
        const results = await TaskCategory.findAll()

        res.status(200).json(results)
    }

    static async createTask(req, res, next){
        try{
            let { title, category } = req.body

            const newTask = await Task.create({title, UserId : req.userId, TaskCategoryId : category })

            res.status(201).json({ task : newTask })
        } catch (e){
            next(e)
        }
    }

    static async updateTask(req, res){
        const { id } = req.params

        const { category } = req.body

        await Task.update({ TaskCategoryId : category.id }, {
            where : {
                id
            }
        })

        res.status(200).json({message : 'Task successfully updated'})
    }

    static async deleteTask(req, res){
        const { id } = req.params

        let task = await Task.destroy({
            where : {
                id
            }
        })

        res.status(202).json({message : 'Task successfully deleted'})
    }
}

module.exports = TaskController
