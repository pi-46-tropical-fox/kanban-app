function errorHandler(err,req,res,next){

    console.log(err.errors)
      switch (err.name) {
        case "SequelizeValidationError":
          
            let dataError=[]
           err.errors.forEach(element => {
             dataError.push(element.message)
           });
           res.status(400).json({message : {dataError}})
          break
        case "NotAcceptableError":
           res.status(406).json({message : err.message})
          break;
        
        case 'JsonWebTokenError': {
            res.status(406).json({ message: err.message })
            break
        }
    
        case 'ForbiddenError' : {
            res.status(403).json({ message: err.message })
            break
        }
       
        case "NotFoundError":
            res.status(404).json({message : err.message})
           break;
    
        default:
          break;
      }
    }

module.exports = errorHandler