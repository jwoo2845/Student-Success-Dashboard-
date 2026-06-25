function AssignmentCard({
  assignment,
  onDelete,
}) {
  return (
    <div>
      <h3>{assignment.title}</h3>

      <p>Subject: {assignment.subject}</p>

      <p>Due Date: {assignment.dueDate}</p>

      <p>Priority: {assignment.priority}</p>

      <p>Status: {assignment.status}</p>

      <button
        onClick={() => onDelete(assignment.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default AssignmentCard;