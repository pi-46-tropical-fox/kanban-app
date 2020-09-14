const { User, Task, Role, Organization, Category }= require("../models")

class CategoryController{

  static async addCategory(req, res, next,){
    try{
      let {name} = req.body



      let categoryData = await Category.create({name})
      // console.log(categoryData);
      res.status(201).json({categoryData})
    }catch(err){
      console.log(err);
      next(err)
    }
  }

  static async editCategory(req, res, next,){
    try{
      let id = req.params.id
      let {name} = req.body
      let categoryData = await Category.update({name}, {where: {id}})
      // console.log(categoryData);
      res.status(200).json({categoryData})
    }catch(err){
      console.log(err);
      next(err)
    }
  }

  static async getCategories(req, res, next){
    try{
      let categoryData = await Category.findAll()
      res.status(200).json({categoryData})

    }catch(err){
      console.log(err);
      next(err)
    }
  }

  static async deleteCategory(req, res, next){
    try{
      const id= req.params.id
      let destroyedCategoryData = await Category.destroy({where:{id}})
      let destroyedTaskData = await Task.destroy({where:{CategoryId: id}})
      res.status(200).json({destroyedCategoryData})

    }catch(err){
      console.log(err);
      next(err)
    }
  }
}

module.exports = CategoryController