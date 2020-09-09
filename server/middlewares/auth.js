const {verifyToken} = require('../helpers/jsonWebToken');
const {Task, User} = require('../models');

const authentication = async (req,res,next) => {
    // console.log(req.headers, "ini authentication...")
    const {access_token} = req.headers // saat login ia mengenerate token yang disimpan pada req.headers
    
    try {
        const userData = verifyToken(access_token) // oh ya ada tokennya nih
        // isi tokennya (id) dicek ke database
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })

        if(user) { // kalau ada lanjut
            req.userData = userData // disimpan untuk dipakai pada proses2 selanjutnya
            next()
        } else {
            throw {message: "User not autenticated", statusCode: 401}
        }

    } catch (err) {
        return next(err)
    }
}

const authorization = async (req,res,next) => {
    const {id} = req.params 

    try {
        const task = await Task.findByPk(id)

        if(task && task.UserId === req.userData.id) { // dicocokin userId todo dg userId pada token
            next()
        } else {
            return res.status(403).json({message: "forbidden access"})
        }
    } catch (err) {
        return res.status(403).json({message: "forbidden access"})
    }
}

module.exports = {
    authentication, authorization
};
