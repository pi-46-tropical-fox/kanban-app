const { Assignee } = require('../models')

class AssigneeController{
    static async create(req, res, next){
        try {
            // this requires user to be assigned, existed in the same organization first

            let data = {
                UserId: req.body.id,
                TaskId: req.params.taskId
            }

            let assignee = await Assignee.create(data)

            res.status(200).json({ message: "Successfully assigned user to a task." })
        } catch (e) {
            return next(e)
        }
    }
    
    static async destroy(req, res, next){
        try {
            let res = await Assignee.destroy(req.params.id)

            res.status(200).json({ message: "Successfully removed the assignee." })
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = AssigneeController