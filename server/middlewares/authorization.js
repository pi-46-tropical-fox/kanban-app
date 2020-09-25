const { Task } = require('../models')

module.exports = (req, res, next) => {
  let { UserId } = req.user
  let id = req.params.id

  Task.findOne({
    where: { id }
  })
  .then(isFound => {
    if(!isFound) {
      throw {status: 404, message: 'Task not found'}
    }
    if(UserId !== isFound.UserId) {
      throw {status: 403, message: 'Forbidden access'}
    }
    next()
  })
  .catch(err => {
    next(err)
  })
}