const {Category, Task} = require('../models')

class CategoryController {
    static async showAllCategory (req, res, next){
        try {
            const categories = await Category.findAll()
            return res.status(200).json(categories)
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = CategoryController