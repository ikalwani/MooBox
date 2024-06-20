import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const urgencyLevels = [
  { label: "Low grazing", color: "bg-green-100" },
  { label: "Medium grazing", color: "bg-yellow-100" },
  { label: "High grazing", color: "bg-red-100" },
];

const TodoListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [urgency, setUrgency] = useState("Low grazing");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const urgencyObj = urgencyLevels.find((level) => level.label === urgency);
      setTasks([
        ...tasks,
        { id: uuidv4(), text: newTask, completed: false, urgency: urgencyObj },
      ]);
      setNewTask("");
      setUrgency("Low grazing");
    }
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-[#f5f5dc] flex flex-col relative min-h-screen">
      <header className="bg-[#eee8aa] text-black p-4 flex justify-center items-center">
        <div className="text-2xl font-bold">To-Do List</div>
      </header>

      <main className="flex-1 flex flex-col items-center p-20">
        <div className="bg-white p-10 border border-black rounded shadow-lg w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">Tasks</h2>
          <div className="flex mb-4 w-full">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-l"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="px-4 py-2 border border-l-0"
            >
              {urgencyLevels.map((level) => (
                <option key={level.label} value={level.label}>
                  {level.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-[#eee8aa] text-black border border-l-0 rounded-r"
            >
              Add
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Task</th>
                <th className="border px-4 py-2">Urgency</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`${task.completed ? "line-through" : ""} ${
                    task.urgency.color
                  }`}
                >
                  <td
                    className="border px-4 py-2 break-words"
                    style={{
                      wordWrap: "break-word",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {task.text}
                  </td>
                  <td className="border px-4 py-2">{task.urgency.label}</td>
                  <td className="border px-4 py-2 flex justify-around">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="text-black border bg-blue-200 px-3 py-1"
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-black border bg-red-300  px-3 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TodoListPage;