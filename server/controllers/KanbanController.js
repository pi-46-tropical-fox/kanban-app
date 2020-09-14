const {Task,Project,Category,User,Organization} = require('../models')

class KanbanController {

    static async getProjects(req,res,next) {
        try {
            // console.log(req.userData.id);
            const projectUser = await Project.findAll({
                include: Category
            })
            return res.status(200).json(projectUser)
        } catch(err) {
            return next(err)
        }
    }

    static async getCategories(req,res,next) {
        try {
            
            // const projectUser = await Project.findAll({
            //     where: {id: 1} // asumsi hanya ada 1 project
            // })
            // console.log('berhasil', projectUser);
            
            const categoriesUser = await Category.findAll({
                where: {ProjectId : req.params.id},
                include: Task,
                order: [['id', 'ASC']]
            })
            

            return res.status(200).json(categoriesUser)
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

    static async updateCategory(req,res,next) {
        try {
            const updateCategory = {
                title: req.body.title,
                ProjectId: req.params.id,
            }
            const result = await Category.update(updateCategory, {
                where: {id: 13} // dari body
            })

            return res.status(200).json(updateCategory)
        } catch(err) {
            return next(err)
        }
    }

    static async deleteCategory(req,res,next) {
        try { 
            const deletedCategory = await Category.destroy({
                where: {id : 16},
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
                date_post: new Date(),
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
                   console.log(categoriesUser);
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