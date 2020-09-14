const { User, Role}= require("../models")
const bcrypt = require('bcryptjs');
const {generateToken, verifyToken} = require("../helpers/userToken");

class UserController{
   static async login(req, res, next){
     try{
      const {email, password} = req.body
      
      let userData = await User.findOne({where:{email}})
      // console.log(userData);
      if(!userData){
        let error = Error ()
        error.name = "400"
        error.message="Wrong Email/Password, Please try again."
        throw error

      }
      else{
        let isValid = bcrypt.compareSync(password, userData.password)
        if (!isValid){
          let error = Error ()
          error.name = "400"
          error.message="Wrong Email/Password, Please try again."
          throw error
  
        }
        else {
          let access_token = generateToken(userData)
          res.status(200).json({access_token})
        }
      }

     }catch(err){
      // console.log(err)
      next(err)
     }
   }

   static async register(req, res, next){
     try{
        const {email, name, password} = req.body
        let userData = await User.create({email, name, password})
        let roleData = await Role.create({name: "member", UserId: userData.id, OrganizationId: 1})
        
        res.status(201).json({id: userData.id, email: userData.email, name: userData.name, roleData})
     }catch(err){
      next(err)
     }
   }
}

module.exports = UserController