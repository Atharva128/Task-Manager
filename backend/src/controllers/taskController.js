const db = require('../models/db');

exports.getTasks = async (req, res) => {
  const result = await db.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(result.rows);
};

exports.createTask = async (req, res) => {
  const { title, description, priority, status } = req.body;

  const result = await db.query(
    'INSERT INTO tasks(title, description, priority, status) VALUES($1,$2,$3,$4) RETURNING *',
    [title, description, priority, status]
  );

  res.json(result.rows[0]);
};

exports.deleteTask = async (req, res) => {
  await db.query('DELETE FROM tasks WHERE id=$1', [req.params.id]);
  res.json({ message: "Deleted" });
};