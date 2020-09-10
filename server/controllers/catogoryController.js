const {Category} = require('../models')

class CategoryController {

    static create(req, res, next) {
        let newCategory = {
            name: req.body.name,
        }
        Category.create(newCategory)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CategoryController