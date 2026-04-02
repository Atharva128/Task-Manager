const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/taskController');

router.get('/', ctrl.getTasks);
router.post('/', ctrl.createTask);
router.delete('/:id', ctrl.deleteTask);

module.exports = router;