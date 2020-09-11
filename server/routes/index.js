const route = require('express').Router()
const authRoute = require('../routes/auth')
const organizationRoute = require('../routes/organization')
const boardRoute = require('../routes/board')
const categoryRoute = require('../routes/category')
const taskRoute = require('../routes/task')

route.get('/', (req, res) => {
    res.send('Oppsss')
})

// auth
route.use('/auth', authRoute)

// organization
route.use('/organization', organizationRoute)

// board
route.use('/board', boardRoute)

// category
route.use('/category', categoryRoute)

// task
route.use('/task', taskRoute)


module.exports = route