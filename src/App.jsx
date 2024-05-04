import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { MdDarkMode, MdSunny, MdOutlineDoneAll } from "react-icons/md";
import CompletedTasksModal from "./components/CompletedTasksModal";

const LOCAL_STORAGE_KEY = "tasks";

function App() {
  const [darkTheme, setDarkTheme] = useState(false); 
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  }); // State for tasks
  const [showCompletedModal, setShowCompletedModal] = useState(false); 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks)); // Store tasks in local storage
  }, [tasks]);

  //add a new task
  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  //edit a task
  const editTask = (id, title) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  };

  //delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle task completion
  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    if (updatedTasks.find((task) => task.id === id && task.completed)) {
      toast.success("Task added to completed list.");
    }
  };

  //clear all tasks
  const clearTasks = () => {
    setTasks([]);
  };

  //toggle dark mode
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  //completed tasks 
  const handleDoneAll = () => {
    setShowCompletedModal(true);
  };

  //closing completed tasks 
  const handleCloseCompletedModal = () => {
    setShowCompletedModal(false);
  };

  //removing a task 
  const handleRemoveTask = (taskId) => {
    deleteTask(taskId);
  };

  // Filter tasks based on status
  const completedTasks = tasks.filter((task) => task.completed);
  const remainingTasks = tasks.filter((task) => !task.completed);

  return (
    <div
      className={`hero ${
        darkTheme ? "bg-gray-900" : "bg-gray-100"
      } h-screen md:min-h-[700px]  w-full m-auto flex flex-col items-center mt-14 transition-all duration-500`}
    >
      <ToastContainer />
      <div
        className={`flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 ${
          darkTheme ? "text-white" : "text-black"
        }`}
      >
        {/* Header section */}
        <div className="flex items-center justify-between">
          <h1 className="uppercase text-4xl font-bold text-gray-900 tracking-widest md:text-3xl">
            My Tasks
          </h1>
          <div className="flex items-center">
            <MdOutlineDoneAll
              onClick={handleDoneAll}
              size={32}
              className={"bg-gray-300 cursor-pointer mr-4 p-2 rounded-lg  bottom-5 right-5"}
            />
            {darkTheme ? (
              <MdSunny
                onClick={toggleTheme}
                className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 ${
                  darkTheme ? "text-white" : "text-black"
                }`}
                size={32}
              />
            ) : (
              <MdDarkMode
                onClick={toggleTheme}
                className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 ${
                  darkTheme ? "text-white" : "text-black"
                }`}
                size={32}
              />
            )}
          </div>
        </div>
        {/* Add task form */}
        <div className="shadow-md">
          <AddTaskForm darkTheme={darkTheme} onAddTask={addTask} />
        </div>
        {/* Task list section */}
        <div
          className={`scroll ${
            darkTheme ? "bg-gray-800" : "bg-white"
          } w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500`}
        >
          <div
            className={`w-full overflow-hidden mb- sticky top-0 ${
              darkTheme ? "bg-gray-800" : "bg-white"
            } flex items-center justify-between text-gray-500 border-b`}
          >
            <p className="text-gray-500 px-2 py-3">{remainingTasks.length} tasks left </p>
            <button onClick={clearTasks}>Clear all tasks</button>
          </div>          
          {tasks.length ? (
            <TaskList
              tasks={remainingTasks}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onToggleCompleted={toggleCompleted}
            />
          ) : (
            <div className="w-full h-[80%] flex items-center justify-center overflow-hidden">
              <p className="text-gray-500 text-center z-10">Empty task</p>
            </div>
          )}
        </div>
      </div>
      {/* Completed tasks modal */}
      {showCompletedModal && (
        <CompletedTasksModal
          completedTasks={completedTasks}
          onClose={handleCloseCompletedModal}
          onRemoveTask={handleRemoveTask}
        />
      )}
    </div>
  );
}

export default App;
