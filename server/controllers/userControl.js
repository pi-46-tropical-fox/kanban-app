const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { Task } = require('../models')
const {OAuth2Client} = require('google-auth-library');

class ControlUser{
  static register(req,res,next){
    let data = {
      email : req.body.email,
      name : req.body.name,
      password : req.body.password
    }
    console.log(data)
    User
    .findOne({
      where :  
      {email : data.email}
    })
    .then(avail=>{
    
      if(!avail){
        User.create(data)
        res.status(201).json(data)
      }
      else{

        let err = createError(406,'email is already exist')
        throw err
      }
    })
    .catch(err=>{
      next(err)
    })
  }

 static login(req,res,next){
  let data = {
    email: req.body.email,
    password : req.body.password
  }
  User.findOne({
    where: {email :data.email}
  })
  .then(result=>{
    if(result){
        if(bcrypt.compareSync(data.password,result.dataValues.password)){
          let obj = {
            email :result.email,
            id: result.id
          } 
          let token = jwt.sign(obj,"Secret Key")
          res.status(200).json({token : token})
        }
        else{
          throw createError(404,"Wrong Password")
        }
    }else{
      throw createError(404,"email not found")
    }
  })
  .catch(err=>{
    next(err)
  })

  }

  static googleLogin(req, res, next){
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    const {google_access_token} = req.headers
    let email_google = ''
    client.verifyIdToken({
        idToken: google_access_token,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      console.log(ticket, '<<< ticket')
        return ticket.getPayload()
    })
    .then(payload => {
        console.log(payload);
        email_google = payload.email
        return User.findOne({where:{email:payload.email}})
    })
    .then(user => {
        if (!user) {
            let params = {
                email: email_google,
                password: 'defaultgoogle'
            }
            return User.create(params)
        } 
        else {
            return user
        }
    })
    .then(user => {
        const token = jwt.sign({email: user.email, id: user.id}, process.env.SECRET)
        console.log(token);
        res.status(200).json({token})
    })
    .catch(err => console.log(err))
  }

  static getTask(req,res,next){
    Task.findAll({
      order: [['updatedAt','ASC']]
    })
    .then(result=>{
    
      if(result.length!==0){
        res.status(200).json(result)
      }
      else{
        throw createError(404,"data empty")
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static postTask(req,res,next){
    let data = {
      title: req.body.title,
      category: req.body.category,
      UserId : req.user.id
    }
   
    Task.create(data)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      next(err)
    })
  }

  static findOne(req,res,next){
    Task.findByPk(req.params.id)
    .then(result=>{
 
      res.status(200).json(result)
    })
    .catch(err=>{
      next(err)
    })
  }

  static putTask(req,res,next){
    let data ={
      title: req.body.title,
      category: req.body.category,
    }
    console.log(data,"aaa")
    Task.update(data,{
      where : {id : req.params.id},
      returning : true
    })
    .then(result=>{
      res.status(201).json(result[1])
    })
    .catch(err=>{
      next(err)
    })
  }


  static deleteTask(req,res,next){
    let data = ""
    let id = req.params.id
    Task.findOne({
      where : {id : id}
    })
    .then(result=>{
      data = result
      return Task.destroy({
        where: {id:id}
      })
    })
    .then(()=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
  
}

module.exports = ControlUser

