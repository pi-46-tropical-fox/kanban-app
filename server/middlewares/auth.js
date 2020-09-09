const { verifyToken } = require('../helpers/jwt');
const { User, Kanban } = require('../models')

const authentication = async (req, res, next) => {
  // console.log(req.headers, '<<< ini headers di authentication');
  const { access_token } = req.headers
  try {
    const userData = verifyToken(access_token)
    let user = await User.findOne({
      where: {
        email: userData.email
      }
    })
    // console.log(user,'<<<< user');
    if (user) {
      req.userData = user
      next()
    } else {
      return res.status(401).json({message: 'User not authenticated'})
    }
  } catch (err) {
    return res.status(500).send(err)
  }
}

const authorization = async (req, res, next) => {
  const { id } = req.params

  try {
    const kanban = await Kanban.findByPk(id)
    console.log(kanban, '<<<< ini kanban');
    // console.log(req.userData.id, '<<<<       ini userData.id');
    // console.log(kanban.UserId, 'ini userId');
    if(kanban && kanban.UserId === req.userData.id) {
      next()
    } else {
      return res.status(403).json({message: 'forbidden access'})
    }
  } catch(err) {
    return res.status(500).send(err)
  }
}

module.exports = { authentication, authorization}