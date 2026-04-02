import { useState, useEffect } from 'react';
import API from '../services/api';

export default function TaskForm({ onAdd, editTask, clearEdit }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending'
  });

  // 🔥 Fill form when editing
  useEffect(() => {
    if (editTask) {
      setTask(editTask);
    }
  }, [editTask]);

  const handleSubmit = async () => {
    if (!task.title.trim()) return alert("Title required");

    try {
      if (editTask) {
        // ✅ UPDATE
        await API.put(`/tasks/${editTask.id}`, task);
      } else {
        // ✅ CREATE
        await API.post('/tasks', task);
      }

      setTask({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending'
      });

      if (clearEdit) clearEdit();
      if (onAdd) onAdd();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-box">
      <h2>{editTask ? "Edit Task" : "Add New Task"}</h2>

      <input
        placeholder="Enter task title"
        value={task.title}
        onChange={e => setTask({ ...task, title: e.target.value })}
      />

      <textarea
        placeholder="Enter task description"
        value={task.description}
        onChange={e => setTask({ ...task, description: e.target.value })}
      />

      <div className="row">
        <select
          value={task.priority}
          onChange={e => setTask({ ...task, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={task.status}
          onChange={e => setTask({ ...task, status: e.target.value })}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <button onClick={handleSubmit}>
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}
