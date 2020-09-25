const {Task,Project,Category,User,Organization} = require('../models')

class KanbanController {

    static async getProjects(req,res,next) {
        try {
            const projectUser = await Project.findAll()
            return res.status(200).json(projectUser)
        } catch(err) {
            return next(err)
        }
    }

    static async getCategories(req,res,next) {
        try {
        
            const categories = await Category.findAll({
                where: {ProjectId : req.params.id},
                order: [['id', 'ASC']]
            })
            for (let i = 0; i < categories.length; i++) {
                categories[i].Tasks = []
                const temp = await Task.findAll({
                    where: {CategoryId : categories[i].id},
                    order: [['due_date', 'ASC']]
                })
                categories[i].dataValues['Tasks'] = temp
            }
            return res.status(200).json(categories)
        } catch(err) {
            return next(err)
        }
    }

    static async postCategory(req,res,next) {
        try {  
            const addCategory = {
                title: req.body.title,
                ProjectId: req.params.id,
            }
            const result = await Category.create(addCategory)

            return res.status(200).json(result)
        } catch(err) {
            return next(err)
        }
    }
    
    static async getCategory(req,res,next) {
        try {
            const CategoryUser = await Category.findByPk(req.params.categories)
            return res.status(200).json(CategoryUser)
        } catch(err) {
            return next(err)
        }
    }

    static async updateCategory(req,res,next) {
        try {
            const updateCategory = {
                title: req.body.title,
            }
            const result = await Category.update(updateCategory, {
                where: {id : req.params.categories},
            })

            return res.status(200).json(result)
        } catch(err) {
            return next(err)
        }
    }

    static async deleteCategory(req,res,next) {
        try { 
            const deletedCategory = await Category.destroy({
                where: {id : req.params.categories},
            })

            return res.status(200).json(deletedCategory)
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
                username: req.userData.username,
                UserId : req.userData.id, //req.userData.id,
                CategoryId : req.body.CategoryId || 1
            }
            const result = await Task.create(addTask)
            return res.status(200).json(result)
        } catch(err) {
            return next(err)
        }
    }
    
    static async getTask(req,res,next) {
        try { 
            const taskUser = await Task.findOne({
                where: {id: req.params.id},
                order: [['id', 'ASC']]})
            return res.status(200).json(taskUser)
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
                due_date: req.body.due_date|| null
            }

            const result = await Task.update(updatedTask, {
                where: {id: req.params.id}
            })

            return res.status(200).json(result)
        } catch(err) {
            return next(err)
        }
    }
    
    static async deleteTask(req,res,next) {
        try { 
            const deletedTask = await Task.destroy({
                where: {id : req.params.id},
            })
            return res.status(200).json(deletedTask)
        } catch(err) {
            return next(err)
        }
    }

    static async moveTask(req,res,next){
        try {
            
            const taskUser = await Task.findOne({
                where: {id: req.params.id}})
                
                let move = taskUser.CategoryId + 1
                
                const categoriesUser = await Category.findAll({
                    where: {
                        id : move,
                        ProjectId: req.userData.ProjectId
                    }
                })
                
                if(categoriesUser) {
                    const moveTask = {
                        CategoryId: move,
                    }
                    const result = await Task.update(moveTask, {
                        where: {id: req.params.id}
                    })
                    
                    return res.status(200).json(result)
                } else {
                    throw  {msg: "can't move", statusCode: 401}
                }
           
        } catch(err) {
            return next(err)
        }
    }

    static async backTask(req,res,next){
        try { 
            
            const taskUser = await Task.findOne({
                where: {id: req.params.id}
            })
                
            let move = taskUser.CategoryId - 1

            const categoriesUser = await Category.findAll({
                where: {
                    id : move,
                    ProjectId: req.userData.ProjectId
                }
            })

            if(categoriesUser) {
                const moveTask = {
                    CategoryId: move,
                }
                
                const result = await Task.update(moveTask, {
                    where: {id: req.params.id}
                })
                
                return res.status(200).json(result)
            } else {
                throw  {msg: "can't move", statusCode: 401}
            }
            
        } catch(err) {
            return next(err)
        }
    }

}

module.exports = KanbanController