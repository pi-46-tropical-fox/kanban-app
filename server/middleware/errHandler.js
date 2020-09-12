const errHandler = (err, req, res, next) => {
    let statusCode
    let errors = []
    if(err.name === 'SequelizeValidationError'){
        statusCode = 400
        for(const el of err.errors){
            errors.push(el.message)
        }
    }else if(err.name === 'SequelizeUniqueConstraintError'){
        statusCode = 400
        errors.push('Email already exists, please use another email')
    }else if(err.name === 'InvalidEmailPassword'){
        statusCode = 400
        errors.push('Email or Password is incorrect')
    }else if(err.name === 'NotAuthenticated'){
        statusCode = 401
        errors.push(`User not authenticated`)
    }else if(err.name === 'JsonWebTokenError'){
        statusCode = 401
        errors.push(`User not authenticated`)
    }else if(err.name === 'apiKeyInvalid'){
        statusCode = 401
        errors.push('User not authenticated')
    }else if(err.name === 'ForbidenAccess'){
        statusCode = 403
        errors.push(`Forbidden access`)
    }else if(err.name === 'TaskNotFound'){
        statusCode = 404
        errors.push('Task not found')
    }else{
        statusCode = 500
        errors.push('Internal server error')
    }
    res.status(statusCode).json({ errors });
}
module.exports = errHandler