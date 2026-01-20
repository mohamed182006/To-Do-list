import TaskItem from "./TaskItem";

export default TaskList;

function TaskList({
  filterTasks,
  handleDelet,
  handleItemDone,
  formatLocalDate,
  img2,
  img3,
  img4,
  editing,
  startEdit,
  saveEdit,
}) {
  // جزء ترتيب المهام

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const sortedTasks = [...filterTasks].sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];

    if (priorityDiff !== 0) return priorityDiff;

    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="task">
      <ul>
        {sortedTasks.map(({ id, text, completed, date, priority }) => (
          <TaskItem
            key={id}
            id={id}
            text={text}
            completed={completed}
            date={date}
            handleItemDone={handleItemDone}
            handleDelet={handleDelet}
            formatLocalDate={formatLocalDate}
            img2={img2}
            img3={img3}
            img4={img4}
            priority={priority}
            editing={editing}
            startEdit={startEdit}
            saveEdit={saveEdit}
          />
        ))}
      </ul>
    </div>
  );
}
