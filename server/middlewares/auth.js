const User = require('../models')


async function authentication(req, res, next){
    const { access_token } = req.headers
    console.log(access_token)
}

async function authorization(req, res, next){

}

module.exports = { authentication, authorization }
