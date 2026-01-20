export default TaskItem;

function TaskItem({
  text,
  id,
  completed,
  date,
  priority,
  handleDelet,
  handleItemDone,
  formatLocalDate,
  img2,
  img3,
  img4,
  editing,
  startEdit,
}) {
  // لو العنصر تحت التعديل، نخليه ما يظهرش
  if (editing === id) return null;

  return (
    <li className="item">
      <span className="circle" onClick={() => handleItemDone(id)}>
        {completed ? <img className="check" src={img3} /> : ""}
      </span>

      <span className={completed ? "done" : ""}>{text}</span>

      <div>
        <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>

        <span className="time">{formatLocalDate(date)}</span>

        <span
          className="edit"
          onClick={() => startEdit({ id, text, date, priority })}
        >
          <img src={img4} alt="edit" />
        </span>

        <span
          onClick={() => {
            handleDelet(id);
          }}
        >
          <img src={img2} />
        </span>
      </div>
    </li>
  );
}
