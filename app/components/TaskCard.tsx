"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();
  const { toggleTask, deleteTask } = useTaskContext();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await toggleTask(task.id);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(task.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleCardClick = () => {
    router.push(`/edit/${task.id}`);
  };

  return (
    <div className="relative">
      <div
        className={`p-4 rounded-lg border transition-all duration-200 hover:border-gray-500 ${
          task.completed ? "opacity-60" : ""
        }`}
        style={{
          backgroundColor: "#262626",
          border: "1px solid #333333",
          borderRadius: "8px",
        }}
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <button
              onClick={handleToggle}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.completed ? "text-white" : "border-gray-400"
              }`}
              style={{
                backgroundColor: task.completed ? "#8284FA" : "transparent",
                borderColor: task.completed ? "#8284FA" : "#4EA8DE",
              }}
            >
              {task.completed && (
                <FaCheck size={8} style={{ color: "#F2F2F2" }} />
              )}
            </button>
            <div className="flex-1">
              <p
                className={`text-white ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </p>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="ml-2 p-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <FaRegTrashCan size={20} style={{ color: "#808080" }} />
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 #262626 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Delete Task
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete &ldquo;{task.title}&rdquo;? This
              action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
