const errHandler = (err, req, res, next) => {
    let code = 500
    let message = []

    // console.log(err.name);
    console.log(err.name);

    if(err.code){
        code = err.code
        message.push(err.msg)
    } else if(err.name) {
        switch(err.name){
            case 'SequelizeValidationError':
                err.errors.forEach(error => {
                    message.push(error.message)
                })
                code = 400
            break
        }
    }

    res.status(code).json(message)
}

module.exports = errHandler