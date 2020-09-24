const {Task, User, Category} = require(`../models`)

class Controller{
    static async add(req, res, next){
        const {categoryId} = req.params
        const {title} = req.body
        const {id} = req.userData

        try{
            const task = await Task.create({title, UserId: id, CategoryId: categoryId})
            return res.status(201).json({
                data:{
                    message: "Successfully create new Task"
                }
            })
        }catch(err){
            console.log(err)
            return next()
        }
    }

    static async readTask(req, res, next){
        try{
            const tasks = await Task.findAll({
                include: [User, Category]
            })
            
            const categories = await Category.findAll()
            const newCategories = {}
            categories.forEach(cat => {
                newCategories[cat.name] = {
                    id: cat.id,
                    name: cat.name,
                    tasks: tasks.filter(task => task.Category.name == cat.name)
                }
            })

            return res.status(200).json({
                tasks: newCategories,
                allCarId: categories.map(cat => {return cat.id}),
                allCarName: categories.map(cat => {return cat.name}),
            })
        }catch(err){
            return next(err)
        }
    }

    static async findTaskById(req, res, next){
        const {id} = req.params
        try{
            const task = await Task.findByPk(id)
            return res.status(200).json({
                task
            })
        } catch(err) {
            return next(err)
        }
    }

    static async updateCategory(req, res, next){
        const {id} = req.params
        const {newCategoryId} = req.body
        try{
            const task = await Task.update({CategoryId: newCategoryId}, {where: {id}})
            return res.status(200).json({
                message: "Success move category"
            })
        } catch(err) {
            return next(err)
        }
    }

    static async editTask(req, res, next){
        const {title} = req.body
        const {id} = req.params

        try{
            const task = await Task.update({title}, {where:{id}})
            return res.status(200).json({
                message: "Successfully Edit Task"
            })
        } catch(err) {
            return next(err)
        }
    }

    static async delete(req, res, next){
        const {id} = req.params
        try{
            const task = await Task.destroy({where: {id}})
            return res.status(200).json({
                id: Number(id),
                message: "Successfully delete Task"
            })
        }catch(err){
            return next(err)
        }
    }
}

module.exports = Controller