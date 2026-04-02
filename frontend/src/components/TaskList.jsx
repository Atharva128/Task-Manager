import { useEffect, useState } from 'react';
import API from '../services/api';
import TaskCard from './TaskCard';

export default function TaskList({ refreshTrigger, onEdit }) {
  const [tasks, setTasks] = useState([]);

  // 🔹 Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks(); // refresh after delete
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // 🔹 Fetch on load + refresh trigger
  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  // 🔹 Group tasks by status
  const grouped = {
    Pending: [],
    "In Progress": [],
    Completed: []
  };

  tasks.forEach(task => {
    if (grouped[task.status]) {
      grouped[task.status].push(task);
    }
  });

  return (
    <div className="task-board">

      {/* Pending */}
      <div className="column">
        <h3 className="pending">
          Pending ({grouped["Pending"].length})
        </h3>

        {grouped["Pending"].map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={onEdit}
          />
        ))}
      </div>

      {/* In Progress */}
      <div className="column">
        <h3 className="progress">
          In Progress ({grouped["In Progress"].length})
        </h3>

        {grouped["In Progress"].map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={onEdit}
          />
        ))}
      </div>

      {/* Completed */}
      <div className="column">
        <h3 className="completed">
          Completed ({grouped["Completed"].length})
        </h3>

        {grouped["Completed"].map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={onEdit}
          />
        ))}
      </div>

    </div>
  );
}
