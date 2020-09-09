const {Category} = require('../models')

class Controller {
    static listCat (req,res){
        Category.findAll()
        .then(data=>{
            return res.status(200),json(data)
        })
        .catch(err=>{
            return res.status(400).json(err)
        })
    }
    
    static addCat (req,res){
        let params = {
            name:req.body.name
        }
        Category.create(params)
        .then(data=>{
            console.log(data)
            return res.status(201).json(data)
        })
        .catch(err=>{
            return res.status(400).json(err)
        })
    }


}

module.exports = Controller