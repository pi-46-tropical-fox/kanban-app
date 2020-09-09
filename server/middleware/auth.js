const {User,Task} = require('../models')
const {verify} = require('../helpers/jwt')

const authentication = (req,res,next)=>{
    const {access_token} = req.headers
    const user = verify(access_token)
    req.user = user
    console.log(user,"<<<< dari authentication")
    User.findOne({where:{email:user.email}})
    .then(data=>{
        if (data)next()
    })
    .catch(err=>{
        return res.status(401).json({message:`user not authenticate`})
    })
}

const authorization = (req,res,next)=>{
    Task.findOne({where:{UserId:req.user.id}})
    .then(data=>{
        if (data && data.UserId === req.user.id){
            next()
        }else{
            return res.status(403).json({message:`forbidden access`})
        }
    })
    .catch(err=>{
        return res.status(403).json({message:`forbidden access`})
    })
}

module.exports = {authentication ,authorization}