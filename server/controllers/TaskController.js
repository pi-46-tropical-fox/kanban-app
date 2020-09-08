const {Task,Project,Category,User,Organization} = require('../models')

class TaskController {

    static async getTasks(req,res,next) {
        try {
            console.log(req.userData);
            console.log('masuk');
            const project = await Project.findAll({
                where: {UserId : req.userData.id},
                // include: [Task]
            }
            )
            console.log(project, "ada ga");
        } catch(err) {
            return next(err)
        }
    }

    static async postTask(req,res,next) {
        try {
            

        } catch(err) {
            return res.status(500).json(err)
        }
    }

}

module.exports = TaskController