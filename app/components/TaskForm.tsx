"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TaskColor } from "../types/task";
import { useTaskContext } from "../context/TaskContext";

interface TaskFormProps {
  taskId?: string;
  isEdit?: boolean;
}

export const TaskForm = ({ taskId, isEdit = false }: TaskFormProps) => {
  const router = useRouter();
  const { addTask, updateTask, getTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState<TaskColor>("red");
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && taskId) {
      const task = getTask(taskId);
      if (task) {
        setTitle(task.title);
        setColor(task.color);
      } else {
        router.push("/");
      }
    } else if (!isEdit) {
      setTitle("");
      setColor("red");
    }
  }, [isEdit, taskId, getTask, router]);

  const validateForm = (): boolean => {
    const newErrors: { title?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEdit && taskId) {
        await updateTask(taskId, title.trim(), color);
      } else {
        await addTask(title.trim(), color);
      }

      router.push("/");
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const colorOptions = [
    { value: "red", color: "#FF3B30" },
    { value: "orange", color: "#FF9500" },
    { value: "yellow", color: "#FFCC00" },
    { value: "green", color: "#34C759" },
    { value: "blue", color: "#007AFF" },
    { value: "purple", color: "#5856D6" },
    { value: "pink", color: "#AF52DE" },
    { value: "brown", color: "#A2845E" },
  ];

  return (
    <div className="w-full flex flex-col gap-14">
      {/* Back Button */}
      <div className="flex justify-start">
        <button onClick={handleBack} className="text-white h-3.5 w-3.5">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="title"
              className="font-bold text-sm"
              style={{ color: "#4EA8DE" }}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 ${
                errors.title ? "border-red-400" : "border-gray-600"
              }`}
              placeholder="Ex. Brush your teeth"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-bold text-sm" style={{ color: "#4EA8DE" }}>
              Color
            </label>
            <div className="flex space-x-3">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value as TaskColor)}
                  className={`w-8 h-8 rounded-full transition-all duration-200 ${
                    color === option.value
                      ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800"
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: option.color }}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(to right, #1E6F9F, #2B8FD1)" }}
          disabled={isSubmitting}
        >
          <span>
            {isSubmitting ? "Saving..." : title.trim() ? "Save" : "Add Task"}
          </span>
          {title.trim() ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};
