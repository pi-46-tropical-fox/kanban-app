const { User, Task, Role, Organization }= require("../models")


class TaskController{
  static async getTask(req, res, next){
    try{
      const {id, email, name} = req.userData
      let userData = await User.findOne({
        where:{id}, 
        include: [Organization]
      })
      let orgId = userData.Organizations[0].id

      let tasksData = await Task.findAll({
          where:{OrganizationId: orgId},
          order: [ ["createdAt", "ASC"] ]
      })
      res.status(200).json({tasksData})
    }catch(err){
      console.log(err);
      next(err)
    }
  }

  static async addTask(req, res, next){
    try{
      const {title, CategoryId} = req.body
      const {id, email, name} = req.userData
      let userData = await User.findOne({
        where:{id}, 
        include: [Organization]
      })
      let orgId = userData.Organizations[0].id
      let createdTask = await Task.create({
        title, 
        CategoryId,
        UserId: id, 
        OrganizationId: orgId
      })
      res.status(201).json({createdTask})
    }catch(err){
      console.log(err);
      next(err)
    }
  }

  static async editTitleTask(req, res, next){
    try{
      const taskId = req.params.id
      const {title} = req.body

      const {id, email, name} = req.userData
      let userData = await User.findOne({
        where:{id}, 
        include: [Organization]
      })
      let orgId = userData.Organizations[0].id

      let updatedTask = await Task.update({
        title,
        UserId: id,
      }, {where: {id: taskId}})

      res.status(200).json({updatedTask})
    }catch(err){
      console.log(err);
      next(err)
    }
  }

  static async editCategoryTask(req,res,next){
    try{
      const taskId = req.params.id
      const {CategoryId} = req.body

      const {id, email, name} = req.userData
      let userData = await User.findOne({
        where:{id}, 
        include: [Organization]
      })
      let orgId = userData.Organizations[0].id

      let updatedTask = await Task.update({
        CategoryId,
        UserId: id,
      }, {where: {id: taskId}})

      res.status(200).json({updatedTask})
    }catch(err){
      console.log(err);
      next(err)
    }
  }

  static async deleteTask(req, res, next){
    try{
      const taskId = req.params.id

      const {id, email, name} = req.userData
      let userData = await User.findOne({
        where:{id}, 
        include: [Organization]
      })
      let orgId = userData.Organizations[0].id

      let deletedTask = await Task.destroy({where : {id : taskId}})
      
      res.status(200).json({deletedTask})

    }catch(err){
      console.log(err);
      next(err)
    }
  }
}

module.exports = TaskController