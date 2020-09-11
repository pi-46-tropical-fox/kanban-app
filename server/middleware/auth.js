const {User,Task} = require('../models')
const {verify} = require('../helpers/jwt')

const authentication = (req,res,next)=>{
    const {access_token} = req.headers
    const user = verify(access_token)
    req.user = user
    User.findOne({where:{email:user.email}})
    .then(data=>{
        if (data)next()
        else{
            throw ({message:`user not authenticate`,statusCode:401})
        }
    })
    .catch(err=>{
        next(err)
    })
}

const authorization = (req,res,next)=>{
    Task.findByPk(req.params.id)
    .then(data=>{
        if (data && data.UserId === req.user.id){
            console.log('berhasil author')
            next()

        }else{
            throw({message:`forbidden access`,statusCode:403})
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {authentication ,authorization}