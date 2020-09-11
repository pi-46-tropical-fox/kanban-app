const router = require('express').Router()
const Task = require('./taskRoutes')
const User = require('./userRoutes')
const {authentication} = require('../middlewares/auth')

router.get('/', (req, res)=>{
    res.send({message:"BERHASIL MASUK KE DALAM SERVER"})
})

router.use('/', User)
//router.use(authentication)
router.use('/tasks', Task)


module.exports = router