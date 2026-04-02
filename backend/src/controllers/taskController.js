const db = require('../models/db');

// GET all tasks
exports.getTasks = async (req, res) => {
  const result = await db.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(result.rows);
};

// CREATE task
exports.createTask = async (req, res) => {
  const { title, description, priority, status } = req.body;

  const result = await db.query(
    'INSERT INTO tasks(title, description, priority, status) VALUES($1,$2,$3,$4) RETURNING *',
    [title, description, priority, status]
  );

  res.json(result.rows[0]);
};

// DELETE task
exports.deleteTask = async (req, res) => {
  await db.query('DELETE FROM tasks WHERE id=$1', [req.params.id]);
  res.json({ message: "Deleted" });
};

// ✅ UPDATE task (VERY IMPORTANT)
exports.updateTask = async (req, res) => {
  const { title, description, priority, status } = req.body;

  const result = await db.query(
    `UPDATE tasks 
     SET title=$1, description=$2, priority=$3, status=$4 
     WHERE id=$5 RETURNING *`,
    [title, description, priority, status, req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(result.rows[0]);
};
