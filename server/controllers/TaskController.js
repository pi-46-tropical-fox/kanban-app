const {User, Task, Category} = require('../models')

class TaskController {
    static async showAllTask(req, res, next){
        try {
            const tasks = await Task.findAll({
                include: [{
                    model: User,
                    attributes: ['id','email']
                }]
            })
            return res.status(200).json(tasks)
        } catch (err) {
            return next(err)
        }
    }
    static async findTaskById(req, res, next){
        try {
            const task = await Task.findOne({
                include: [{
                    model: User,
                    attributes: ['id','email']
                }, {
                    model: Category,
                    attributes: ['id', 'name']
                }],
                where: {
                    id: +req.params.taskId
                }
            })
            if(!task){
                throw {name: `TaskNotFound`}
            }else{
                return res.status(200).json(task)
            }  
        } catch (err) {
            return next(err)
        }
    }
    static async createNewTask(req, res, next){
        try {
            let obj = {
                title: req.body.title.trim(),
                UserId: +req.user.id,
                CategoryId: +req.params.categoryId
            }
            const task = await Task.create(obj)
            return res.status(201).json(task)
        } catch (err) {
            return next(err)
        }
    }
    static async updateTask(req, res, next){
        try {
            let obj = {
                title: req.body.title.trim(),
                description: req.body.description.trim()
            }
            const task = await Task.update(obj, {
                where: {
                    id : +req.params.taskId
                },
                returning : true
            })
            return res.status(200).json(task[1][0])
        } catch (err) {
            return next(err)
        }
    }
    static async moveTaskCategory(req, res, next){
        try {
            let obj = {
                CategoryId: +req.params.categoryId
            }
            const task = await Task.update(obj, {
                where: {
                    id : +req.params.taskId
                },
                returning : true
            })
            return res.status(200).json(task[1][0])            
        } catch (err) {
            return next(err)
        }
    }
    static async deleteTask(req, res, next){
        try {
            const task = await Task.destroy({
                where: {
                    id : +req.params.taskId
                }
            })
            return res.status(200).json('Success deleting task')
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = TaskController