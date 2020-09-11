const { verifyToken } = require("../helpers/jwt");
const {User, Task} = require("../models");


function authentication(req,res,next){
    try{
        // console.log(req.headers)
        const userData = verifyToken(req.headers.access_token)
        // console.log(userData)
        User.findByPk(userData.id)
        .then(user=>{
            if(user){
                req.userData = userData
                next()
                // console.log(req.userData)
            }else{
                res.status(403).json({message: 'user not authenticate'})
            }   
        })
        .catch(err=>{
            console.log(err)
            res.status(403).json({message: 'user not authenticate'})
        })
    }catch(err){
        res.status(403).json({message: 'user not authenticate'})
        console.log(`${err.name}: ${err.message} <<< eror jwt`) // name: JsonWebTokenError
    }
}
function authorization(req,res,next){
    Task.findByPk(req.params.id)
    .then(task=>{
        if(req.userData.id === task.UserId){
            next()
        }else{
            return res.status(403).json({message: 'user is not authorize'})
        }
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({message: 'internal server error'})
    })
}

module.exports = {authentication, authorization}