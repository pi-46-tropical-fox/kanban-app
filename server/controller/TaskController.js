const { Task, User } = require("../models");

class TaskController {
    static read(req, res) {
        const { organization } = req.userData
        Task.findAll({
                where: {
                    organization
                },
                include: User
            })
            .then(data => {
                res.status(200).json({ tasks: data })
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal Server Error' })
            })
    }

    static create(req, res) {
        let params = {
            description: req.body.description,
            UserId: req.userData.id,
            organization: req.userData.organization,
            category: req.body.category
        }
        Task.create(params)
            .then(data => {
                res.status(201).json({ data })
            }).catch(err => {
                res.status(500).json({ message: 'Internal Server Error' })
            })
    }

    static update(req, res) {

        const { id } = req.params;
        let params = {
            description: req.body.description
        };
        Task.update(params, { where: { id } })
            .then(data => {
                res.status(201).json({ message: 'Data has been successfully updated.' })
            }).catch(err => {
                res.status(500).json({ message: 'Internal Server Error' })
            })
    }

    static delete(req, res) {
        const { id } = req.params;
        Task.destroy({ where: { id } })
            .then(data => {
                res.status(200).json({ message: 'Data has been successfully deleted.' })
            }).catch(err => {
                res.status(500).json({ message: 'Internal Server Error' })
            })
    }

    static move(req, res) {
        const { action } = req.body
        let num;
        if (action == 'forward') {
            num = 1;
        } else {
            num = -1;
        }
        const categories = ['Backlog', 'Todo', 'Doing', 'Completed']
        const { id } = req.params;
        Task.findOne({ where: { id } })
            .then(task => {
                const param = {
                    category: categories[categories.indexOf(`${task.category}`) + num]
                }
                return Task.update(param, { where: { id } })
            }).then(data => {
                res.status(200).json({ message: 'Successfully moved data' })
            }).catch(err => {
                res.status(500).json({ message: 'Internal Server Error' })
            })
    }

}



module.exports = TaskController