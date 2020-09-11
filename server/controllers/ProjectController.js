const { Project, Board, Task, Comment } = require('../models')

class ProjectController{
    static async read(req, res, next){
        try {
            let data = await Project.findByPk(req.params.id)

            res.status(200).json(data)
        } catch (e) {
            return next(e)
        }}

    static async show(req, res, next){
        try {
            let data = await Project.findByPk(req.params.id, {
                include: [
                    {
                        model: Board,
                        include: [{
                            model: Task,
                            include: [{
                                model: Comment,
                            }]
                        }],
                        order: [
                            [Task, 'id', 'ASC']
                        ]
                    }
                ],
                order: [
                    [Board, 'id', 'ASC']
                ]
            })

            res.status(200).json(data)
        } catch (e) {
            return next(e)
        }
    }

    static async create(req, res, next){
        try {
            let { name, type } = req.body
        } catch (e) {
            return next(e)
        }
    }
    
    static async update(req, res, next){
        try {
            let res = Project
        } catch (e) {
            return next(e)
        }
    }
    
    static async destroy(req, res, next){
        try {
            let res = Project.destroy(req.params.id)
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = ProjectController