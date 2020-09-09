const {Task,Project,Category,User,Organization} = require('../models')

class KanbanController {

    static async getProjects(req,res,next) {
        try {
            const projectUser = await Project.findAll({
                where: {UserId : req.userData.id},
            })
            return res.status(200).json(projectUser)
        } catch(err) {
            return next(err)
        }
    }

    static async getCategories(req,res,next) {
        try {
            console.log('masuk');
            console.log(req.params.id);
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

}

module.exports = KanbanController