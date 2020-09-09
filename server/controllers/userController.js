const {User} = require('../models')
const {generate , verify} = require('../helpers/jwt')
const compare = require('../helpers/compare')

class Controller {
    static register(req,res){
        let params = {
            email:req.body.email,
            password:req.body.password
        }
        User.create(params)
        .then(data=>{
            return res.status(201).json({id:data.id,email:data.email})
        })
        .catch(err=>{
            return res.status(400).json(err)
        })
    }
    static login (req,res){
        let params = {
            email:req.body.email,
            password:req.body.password
        }
        User.findOne({where:{email:req.body.email}})
        .then(data=>{
            if(data){
                let isValid = compare(req.body.password,data.password)
                if (isValid){
                    const acces_token = generate(data)
                    console.log(acces_token)
                    return res.status(200).json({acces_token})
                }
            }else{
                return res.status(400).json({message:`wrong email / password`})
            }

        })
        .catch(err=>{
            return res.status(400).json({message:`wrong email / password`})
        })
    }
}

module.exports = Controller