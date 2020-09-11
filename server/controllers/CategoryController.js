const { Category } = require('../models')


class CategoryController {
    static show (req, res, next) {
        Category.findAll()
            .then( data => {
                return res.status(200).json(data)
            })
            .catch (err => {
                return next()
            })
    }
      
    
    static add (req,res,next) {
        const { category } = req.body

        Category.create({category}) 
            .then( category => {
                return res.status(201).json({ message: "Successully create new category"})
            })
            .then( err => {
                return next(err)
            })
        
    }

    static delete (req, res, next) {
        Category.destroy({where: { id: req.params.id}})
            .then( category => {
                return res.status(201).json({message: `Successfully delete category with id ${req.params.id}`})
            })
            .catch( err => {
                return next(err)
            })
    }


}

module.exports = CategoryController