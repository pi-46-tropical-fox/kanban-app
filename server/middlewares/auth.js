const User = require('../models')


async function authentication(req, res, next){
    const { access_token } = req.headers

    // // const { id } = 

    // User.findOne({
    //     where : {
    //         id
    //     }
    // })
    console.log(access_token)
}

async function authorization(req, res, next){

}

module.exports = { authentication, authorization }
