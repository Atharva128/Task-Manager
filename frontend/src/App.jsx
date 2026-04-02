import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';

export default function App() {
  const [refresh, setRefresh] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <>
      <h1>Task Management System</h1>

      <div className="container">
        <TaskForm
          onAdd={triggerRefresh}
          editTask={editTask}
          clearEdit={() => setEditTask(null)}
        />

        <TaskList
          refreshTrigger={refresh}
          onEdit={setEditTask}
        />
      </div>
    </>
  );
}
