const {Task,Project,Category,User,Organization} = require('../models')

class KanbanController {

    static async getProjects(req,res,next) {
        try {
            const projectUser = await Project.findAll({
                where: {UserId : req.userData.id},
                include: Category
            })
            return res.status(200).json(projectUser)
        } catch(err) {
            return next(err)
        }
    }

    static async getCategories(req,res,next) {
        try {
            const categoriesUser = await Category.findAll({
                where: {ProjectId : req.params.id},
                include: Task
            })
            // const taskUser = []
            // categoriesUser.forEach(category => {
            //     taskUser.push(category.Tasks)
            // });
            // console.log(taskUser);
            return res.status(200).json(categoriesUser)
        } catch(err) {
            return next(err)
        }
    }

    static async postTask(req,res,next) {
        try {
             //butuh oper category id ke data (body)
            const addTask = {
                title: req.body.title,
                description: req.body.description,
                date_post: new Date(),
                due_date: req.body.due_date|| null,
                UserId : req.userData.id,
                CategoryId : req.body.CategoryId || 1
            }
            const result = await Task.create(addTask)
            return res.status(200).json(result)
        } catch(err) {
            return next(err)
        }
    }
    
    static async updateTask(req,res,next) {
        try {
            //butuh oper task id ke data (body)
            const updatedTask = {
                title: req.body.title,
                description: req.body.description,
                date_post: new Date(),
                due_date: req.body.due_date|| null
            }

            const result = await Task.update(updatedTask, {
                where: {id: req.body.id}
            })

            return res.status(200).json(result)
        } catch(err) {
            return next(err)
        }
    }
    
    static async deleteTask(req,res,next) {
        try {
            
            console.log('id dapet', req.params.id);
            const deletedTask = await Task.destroy({
                where: {id : req.params.id},
            })
    
            return res.status(200).json(deletedTask)
        } catch(err) {
            return next(err)
        }
    }

}

module.exports = KanbanController