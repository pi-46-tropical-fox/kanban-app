const errHandler = (err, req, res, next) => {
    console.log(err);
    let status
    let errors = []

    console.log(err.name);
    switch (err.name) {
        case 'JsonWebTokenError':
            errors.push('User not authenticated')
            status = 401
        case 'SequelizeUniqueConstraintError':
            errors.push('Email is already registered')
            status = 400
            break
        default:
            errors.push(err.message)
            status = err.status || 500
    }

    return res.status(status).json({errors})
}

module.exports = {
    errHandler
}