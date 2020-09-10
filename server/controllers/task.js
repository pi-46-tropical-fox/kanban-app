const { User, Task, Organization } = require('../models')

class TaskController {
    static async getTasks (req, res, next) {
        try {
            const orgId = req.userData.orgId
            const tasks = await Task.findAll({
                where: {
                    orgId
                },
                attributes: ['id', 'title', 'status'],
                include: [
                    {
                        model: User,
                        attributes: ['email']
                    }
                ]
            })

            return res.status(200).json({tasks})
        } catch (err) {
            return next(err)
        }
    }

    static async new (req, res, next) {
        try {
            const {title} = req.body
            const orgId = req.userData.orgId
            const userId = req.userData.id
            const task = await Task.create({
                title, orgId, userId
            })

            const org = await Organization.findOne({
                where: {
                    id: orgId
                },
                attributes: ['company']
            })

            return res.status(201).json({
                task: {
                    id: task.id,
                    title: task.title,
                    status: task.status,
                    assignee: req.userData.username,
                    company: org.company
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async move (req, res, next) {
        try {
            const {id} = req.params
            const {movement} = req.body
            const categories = ['backlog', 'todo', 'doing', 'done']
    
            const task = await Task.findOne({
                where: {
                    id
                },
                attributes: ['status']
            })

            let index = categories.findIndex(cat => task.status == cat)

            switch (movement) {
                case 'next':
                    index += 1
                    if (index == 4) index = 3
                    break
                case 'prev':
                    index -= 1
                    if (index == -1) index = 0
                    break
            }
    
            let movedTask = await Task.update({
                status: categories[index]
            }, {
                where: {
                    id
                },
                returning: true
            })

            movedTask = movedTask[1]

            return res.status(200).json({
                task: {
                    id: movedTask.id,
                    title: movedTask.title,
                    status: movedTask.status
                }
            })
        } catch (err) {
            return next(err)
        }
    }

    static async edit (req, res, next) {
        try {
            const {title} = req.body
            let edited = await Task.update({
                title
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
    
            edited = edited[1]
        
            return res.status(200).json({
                task: {
                    id: edited.id,
                    title: edited.title,
                    status: edited.status
                }
            })
        } catch (err) {

        }
    }

    static async delete (req, res, next) {
        try {
            await Task.destroy({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json({
                message: 'Task deleted successfully'
            })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = {
    TaskController
}