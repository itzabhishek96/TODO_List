import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { motion } from "framer-motion";

const CompletedTasksModal = ({ completedTasks, onClose, onRemoveTask }) => {
  // Function to handle task removal
  const handleRemoveTask = (taskId) => {
    onRemoveTask(taskId);
  };

  // animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    // Modal container
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg"
        variants={itemVariants}
      >
        {/* Modal header */}
        <div className="bg-gray-200 text-gray-800 px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Completed Tasks</h2>
        </div>
        {/* Modal body */}
        <div className="p-6">
        <div className="max-h-[280px] overflow-y-auto">
          {completedTasks.length === 0 ? (
            <p className="text-gray-600">No tasks completed.</p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {/* Iterate over completed tasks */}
              {completedTasks.map((task, index) => (
                <motion.li
                  key={task.id}
                  className="py-4 flex items-center"
                  variants={itemVariants}
                >
                  <span className="flex-grow text-gray-700">{task.title}</span>
                  <button onClick={() => handleRemoveTask(task.id)}>
                    <AiOutlineDelete
                      size={18}
                      className="text-gray-500 hover:text-red-500 ml-2"
                    />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          Close
        </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompletedTasksModal;
