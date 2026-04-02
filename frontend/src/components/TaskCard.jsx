export default function TaskCard({ task, onDelete }) {
  return (
    <div className="card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small><b>{task.priority}</b></small>
      <br />
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}