const {Category} = require(`../models`)

class Controller {
    static async add(req, res, next){
        const {name} = req.body
        try{
            const isExist = await Category.findOne({where:{name}})
            if(isExist){
                throw { message: "Category already exist", statusCode: 400}
            } else {
                const category = await Category.create({name})
                return res.status(201).json({
                    message: "Successfully create Category"
                })
            }
        }catch(err){
            console.log(err)
            return next(err)
        }
    }

    static async getAllCategory(req, res, next) {
        try{
            const categories = await Category.findAll()
            if(categories.length > 0){
                return res.status(200).json({
                    data: categories
                })
            } else {
                return res.status(204).json({
                    message: "No Content"
                })
            }
        } catch(err){
            return next(err)
        }
    }
}

module.exports = Controller