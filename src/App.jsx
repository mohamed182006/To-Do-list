import { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./App.css";
import img from "../src/assets/calendar.png";
import img2 from "../src/assets/delete.png";
import img3 from "../src/assets/check-mark.png";
import img4 from "../src/assets/edit.png";
import img5 from "../src/assets/paper-recycle.png";
import checkmark from "../src/assets/servicereceptionist-bell-2-418759.mp3";

import Tabs from "./Components/Tabs";
import TaskList from "./Components/TaskList";

function App() {
  const [filter, setFilter] = useState("all");

  // Lazy initialization لحل تحذير ESLint
  const [task, settask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks).map((task) => ({
        ...task,
        date: task.date ? new Date(task.date) : null,
      }));
    }
    return [];
  });

  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("Low");
  const inputRef = useRef();
  const [editing, setEditing] = useState("");

  // عرض التاريخ بشكل جميل
const formatLocalDate = (dateValue) => {
  if (!dateValue) return "";
  const dateObj = new Date(dateValue);
  return dateObj.toLocaleString("en-GB", {   // << هنا
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

  // حفظ التغييرات في localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const handle = () => {
    const text = inputRef.current.value;
    if (!text.trim() || !date) return;

    const now = new Date();
    if (date < now) {
      toast("Please select a valid date !");
      return;
    }

    const newItem = { id: Date.now(), completed: false, text, date, priority };
    settask([...task, newItem]);
    inputRef.current.value = "";
    setDate(null);
    setPriority("Low");
  };

  const audio = new Audio(checkmark);
  const handleItemDone = (id) => {
    const newTodo = task.map((item) => {
      if (item.id === id) {
        if (!item.completed) audio.play();
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    settask(newTodo);
  };

  const handleDelet = (id) => {
    const newTodo = task.filter((item) => item.id !== id);
    settask(newTodo);
  };

  const DeleteAll = () => {
    settask([]);
  };

  const filterTasks = task.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
  });

  const startEdit = (taskItem) => {
    setEditing(taskItem.id);
    inputRef.current.value = taskItem.text;
    setDate(taskItem.date ? new Date(taskItem.date) : null);
    setPriority(taskItem.priority);
  };

  const saveEdit = () => {
    const updated = task.map((t) =>
      t.id === editing
        ? { ...t, text: inputRef.current.value, date, priority }
        : t
    );
    settask(updated);
    inputRef.current.value = "";
    setDate(null);
    setPriority("Low");
    setEditing(null);
  };

  return (
    <div className="app">
      <div className="Head">
        <h1>To_Do_List</h1>
        <img src={img} alt="To_Do_List" />
      </div>

      <div className="add">
        {/* React DatePicker */}
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          showTimeSelect
          dateFormat="Pp"
          className="dateInput"
          placeholderText="Select Date & Time"
        />

        <div className="flex">
          <input
            className="taskInput"
            ref={inputRef}
            placeholder="Add Your Task"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {editing ? (
            <button onClick={saveEdit}>Save</button>
          ) : (
            <button onClick={handle}>Add</button>
          )}
        </div>
      </div>

      <Tabs
        filter={filter}
        setFilter={setFilter}
        DeleteAll={DeleteAll}
        img5={img5}
      />

      <TaskList
        filterTasks={filterTasks}
        handleDelet={handleDelet}
        handleItemDone={handleItemDone}
        img2={img2}
        img3={img3}
        img4={img4}
        formatLocalDate={formatLocalDate}
        editing={editing}
        startEdit={startEdit}
        saveEdit={saveEdit}
      />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#524566ff",
            color: "white",
          },
        }}
      />
    </div>
  );
}

export default App;
