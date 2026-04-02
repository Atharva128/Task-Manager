import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <h1>Task Management System</h1>

      <div className="container">
        <TaskForm refresh={() => setRefresh(!refresh)} />
        <TaskList refreshTrigger={refresh} />
      </div>
    </>
  );
}