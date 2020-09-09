const {Category} = require ("../models")

class CategoryController {
    
    static addCategory (req, res, next) {
        let params = {
            status : req.body.status
        }

        Category.create (params)

        .then (data => {
            return res.status (201).json (data)
        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : "Internal Server Error"})
        })

    }

    static getCategory (req, res, next) {
        Category.findAll ()

        .then (data => {
            return res.status (200).json (data)
        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : "Internal Server Error"})
        })
    }

    static editCategory (req, res, next) {
        let params = {
            status : req.body.status
        }

        Category.update (params, {
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
            return res.status (400).json ({message : "Bad Request"})
        })

    }

    static deleteCategory (req, res, next) {
        Category.destroy ({
            where : {id : req.params.id}
        })

        .then (data => {
            if (!data) {
                return res.status (404).json ({message : "Data is Not Found"})

            } else {
                return res.status (200).json ({message : "Data has been Deleted"})
            }          
        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : "Internal Server Error"})
        })

    }

}

module.exports = CategoryController