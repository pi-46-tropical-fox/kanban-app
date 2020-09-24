const { Category, Task } = require("../models");

class CategoryController {
    static async getCategory(req, res) {
        try {
            const categories = await Category.findAll()
            return res.status(200).json(categories)
        }
        catch(err) {
            console.log(err, 'Error Di Get Category')
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async switchCategory(req, res) {
        try {
            const { taskId } = req.params
            const { number } = req.body
            const task = await Task.findOne({where: {id: taskId}})
            await Task.update({CategoryId: task.CategoryId + number, updatedAt: new Date()}, {where: {id: taskId}})
            return res.status(200).json({message: 'Successfully to Switch'})
            
        }
        catch(err) {
            console.log(err, 'Error Di Switch Category');
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}

module.exports = CategoryController