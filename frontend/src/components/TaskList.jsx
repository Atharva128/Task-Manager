import { useEffect, useState } from 'react';
import API from '../services/api';
import TaskCard from './TaskCard';

export default function TaskList({ refreshTrigger }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const grouped = {
    Pending: [],
    "In Progress": [],
    Completed: []
  };

  tasks.forEach(t => {
    if (grouped[t.status]) {
      grouped[t.status].push(t);
    }
  });

  return (
    <div className="task-board">
      {Object.keys(grouped).map(status => (
        <div key={status} className="column">
          <h3>{status}</h3>
          {grouped[status].map(task => (
            <TaskCard key={task.id} task={task} onDelete={deleteTask} />
          ))}
        </div>
      ))}
    </div>
  );
}