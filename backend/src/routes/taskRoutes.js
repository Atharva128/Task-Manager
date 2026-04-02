const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/taskController');

// GET
router.get('/', ctrl.getTasks);

// CREATE
router.post('/', ctrl.createTask);

// UPDATE ✅
router.put('/:id', ctrl.updateTask);

// DELETE
router.delete('/:id', ctrl.deleteTask);

module.exports = router;
