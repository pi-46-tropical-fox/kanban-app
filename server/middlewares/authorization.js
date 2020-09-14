const {Task} = require ("../models")

const authorization = (req, res, next) => {
    const {id} = req.params

    Task.findByPk (id)

    .then (data => {
        if (data && data.organization === req.UserData.organization) {
            next ()
        
        } else {
            return res.status (403).json ({message : "Unauthorized Access "})
        }
    })

    .catch (err => {
        return res.status (403).json ({message : "Unauthorized Access "})
    })
}

module.exports = {authorization}