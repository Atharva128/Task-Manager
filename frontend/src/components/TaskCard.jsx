export default function TaskCard({ task, onDelete, onEdit }) {
  const priorityClass = task.priority.toLowerCase();

  return (
    <div className={`card ${priorityClass}`}>
      <h4>
        {task.title}
        <span className={`badge ${priorityClass}`}>
          {task.priority.toUpperCase()}
        </span>
      </h4>

      <p>{task.description}</p>

      <div className="actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit && onEdit(task)}
        >
          Edit
        </button>

        <button
          className="btn btn-delete"
          onClick={() => onDelete && onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
