import { useState } from 'react';
import API from '../services/api';

export default function TaskForm({ refresh }) {

  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending'
  });

  const handleSubmit = async () => {
    if (!task.title) return alert("Title required");

    await API.post('/tasks', task);

    setTask({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending'
    });

    if (refresh) refresh();
  };

  return (
    <div className="form-box">
      <h2>Add Task</h2>

      <input
        placeholder="Title"
        value={task.title}
        onChange={e => setTask({ ...task, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={task.description}
        onChange={e => setTask({ ...task, description: e.target.value })}
      />

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

      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}