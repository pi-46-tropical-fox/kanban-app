const router = require('express').Router()
const Task = require('./taskRoutes')
const User = require('./userRoutes')

router.get('/', (req, res)=>{
    res.send({message:"BERHASIL MASUK KE DALAM SERVER"})
})


router.use('/', User)
router.use('/kanban', Task)

module.exports = router