import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

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
  const [task, settask] = useState([]);
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const inputRef = useRef();

  const [editing, setEditing] = useState("");


  // مثال لو عايز تعرض التاريخ بشكل محلي جميل
const formatLocalDate = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12:true,
  });
};

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      settask(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const handle = () => {
    const text = inputRef.current.value;

    // علشان ميضيفش حاجة فاضية
    if (!text.trim() || !date.trim()) return;


    const selectedDate = new Date(date);
    const now = new Date();

     // لو التاريخ قبل اليوم، امنع الإضافة
    if (selectedDate < now) {

     toast("Please select a valid date !");

      return;

    }

    const newItem = { id: Date.now(), completed: false, text, date, priority };

    settask([...task, newItem]);

    inputRef.current.value = "";

    setDate("");
    setPriority("Low");
  };

  // عمل صوت عند اتمام المهمة

  const audio = new Audio(checkmark);

  const handleItemDone = (id) => {
    const newTodo = task.map((item) => {
      if (item.id == id) {
        if (!item.completed) {
          audio.play(checkmark);
        }
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

  const startEdit = (task) => {
    setEditing(task.id);

    inputRef.current.value = task.text;

    setDate(task.date);
    setPriority(task.priority);
  };

  const saveEdit = () => {
    const updated = task.map((t) =>
      t.id === editing
        ? { ...t, text: inputRef.current.value, date, priority }
        : t
    );

    settask(updated);

    // رجع كل حاجة زي مكانت

    inputRef.current.value = "";
    setDate("");
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
        <input
          className="dateInput"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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


      <Toaster position="top-center" toastOptions={{

        style:{

           background: "#524566ff",
                color: "white",
        },

      }}/>

    </div>
  );
}

export default App;
