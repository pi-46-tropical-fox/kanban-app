const { Todo, User, Category } = require('../models')



class TodoController {
    static show (req, res, next) {
        Todo.findAll({include : [ User, Category ]})
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            return next(err)
        })

    }

    static add (req, res, next) {
        const { title, description, due_date, CategoryId } = req.body
        const UserId = req.headers.id

        Todo.create({title, description, due_date, UserId, CategoryId})
            .then( category => {
                return res.status(201).json({message: "Successfully create new task"})
            })
            .catch( err => {
                return next(err)
            })
        
    }

    static edit (req, res, next) {
        let id = req.params.id
        Todo.findOne({where: {id}})
            .then(todo => {
                if(!todo) {
                    throw { message : "Data not found", statusCode: 404 }
                } else {
                    res.status(200).json(todo)
                }
            })
            .catch( err => {
                return next(err)
            })
    }

    static editPost (req, res, next) {
        const { title, description, due_date, CategoryId } = req.body
        const UserId = req.headers.id

        Todo.update({title, description, due_date, UserId, CategoryId}, {where: {id: req.params.id}})
            .then( category => {
                return res.status(201).json({message: "Successfully update task"})
            })
            .catch( err => {
                return next(err)
            })
    }

    static delete (req, res, next) {
        Todo.destroy({where: {id:req.params.id}})
            .then( todo => {
                return res.status(200).json({message: "successfully deleted task"})
            })
            .catch (err =>{
                return next(err)
            })
    }

    
}

module.exports = TodoController


// router.get('/', TodoController.show)
// router.post('/add', TodoController.add)
// router.get('/edit/:id', TodoController.edit)
// router.put('/edit/:id', TodoController.editPost)
// router.delete('/delete/:id', TodoController.delete)
