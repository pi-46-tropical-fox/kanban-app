const {Task} = require ("../models")

class TaskController {

    static addTask (req, res, next) {
        let params = {
            title : req.body.title,
            CategoryId : req.body.CategoryId, 
            UserId : req.UserData.id
        }

        Task.create (params)

        .then (data => {
            return res.status (201).json (data)
        })

        .catch (err => {
            console.log (err)
            return res.status (400).json ({message : "Bad Request - Error Validation"})
        })

    }

    static getTask (req, res, next) {
        Task.findAll ()

        .then (data => {
            return res.status (200).json (data)
        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : "Internal Server Error"})

        })

    }

    static editTask (req, res, next) {
        let params = {
            title : req.body.title,
            CategoryId : req.body.CategoryId
        }

        Task.update (params, {
            where : {id : req.params.id}
        })

        .then (data => {
            if (!data) {
                return res.status (404).json ({message : "Data is Not Found"})
            
            } else {
                return res.status (200).json ({message : "Data has been Updated"})
            }
        })

        .catch (err => {
            console.log (err)
            return res.status (400).json ({message : "Bad Request - Error Validation"})
        })

    }

    static deleteTask (req, res, next) {
        Task.destroy ({
            where : {id : req.params.id}
        })

        .then (data => {
            return res.status (200).json ({message : "Data has been Deleted"})
        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : "Internal Server Error"})
        })

    }

}

module.exports = TaskController