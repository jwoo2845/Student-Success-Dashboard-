function ProgressRow({
  title,
  percentage,
}) {
  return (
    <div className="progress-row">
      <div className="progress-header">
        <span>{title}</span>
        <span>{percentage}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressRow;