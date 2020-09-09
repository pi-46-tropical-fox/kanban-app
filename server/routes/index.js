const router = require('express').Router();
const UserController = require('../controllers/UserController');
const KanbanController = require('../controllers/KanbanController');
const { authentication, authorization } = require('../middlewares/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.post('/kanbans', authentication, KanbanController.createKanban);
router.get('/kanbans', authentication, KanbanController.getKanban);

router.get('/kanbans/:id', authentication, authorization, KanbanController.getKanbanById);
router.put('/kanbans/:id', authentication, authorization, KanbanController.updateKanban);

router.delete('/kanbans/:id', authentication, authorization, KanbanController.deleteKanban);

module.exports = router;