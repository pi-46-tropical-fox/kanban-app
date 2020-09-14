const {generateToken, verifyToken} = require("../helpers/userToken")
const { User, Task }= require("../models")

async function authentication(req, res, next){

  try{
    let access_token = req.headers.access_token
    let userData = verifyToken(access_token)
    let userDataDb = await User.findOne({where: {email: userData.email}})
    if(!userDataDb){
      res.status(403).json({msg: "Unauthenticated user"})
    }
    else{
      req.userData = userData
      next()
    }
  }catch(err){
    next(err)

  }

}

async function authorization(req,res,next){
  try{
    const {id} = req.params
    let userData = verifyToken(req.headers.access_token);
    let taskData = await Task.findByPk(id)
    if (!taskData){
      let error = Error ()
      error.name = "404"
      error.message= "Data not found"
      throw error
    }
    else if (taskData.UserId === userData.id){
      next()
    }
    else {
      let error = Error ()
      error.name = "401"
      error.message= "User are unauthorized to access this data"
      throw error
    }
  }catch(err){
    next(err)

  }
}

module.exports= {authentication, authorization}