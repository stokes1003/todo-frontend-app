"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Task, TaskColor } from "../types/task";
import { apiService, Task as ApiTask } from "../services/api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

interface TaskContextType {
  state: TaskState;
  addTask: (title: string, color: TaskColor) => Promise<void>;
  updateTask: (id: string, title: string, color: TaskColor) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed, updatedAt: new Date() }
            : task
        ),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    loading: true,
  });

  // Load tasks from API on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const apiTasks = await apiService.getTasks();
        const tasks = apiTasks.map((task: ApiTask) => ({
          ...task,
          color: task.color as TaskColor,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        dispatch({ type: "SET_TASKS", payload: tasks });
      } catch (error) {
        console.error("Error loading tasks from API:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadTasks();
  }, []);

  const addTask = async (title: string, color: TaskColor) => {
    try {
      const newTask = await apiService.createTask({ title, color });
      const task: Task = {
        ...newTask,
        color: newTask.color as TaskColor,
        createdAt: new Date(newTask.createdAt),
        updatedAt: new Date(newTask.updatedAt),
      };
      dispatch({ type: "ADD_TASK", payload: task });
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const updateTask = async (id: string, title: string, color: TaskColor) => {
    try {
      const updatedTask = await apiService.updateTask(id, { title, color });
      const task: Task = {
        ...updatedTask,
        color: updatedTask.color as TaskColor,
        createdAt: new Date(updatedTask.createdAt),
        updatedAt: new Date(updatedTask.updatedAt),
      };
      dispatch({ type: "UPDATE_TASK", payload: task });
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await apiService.deleteTask(id);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const toggledTask = await apiService.toggleTask(id);
      const task: Task = {
        ...toggledTask,
        color: toggledTask.color as TaskColor,
        createdAt: new Date(toggledTask.createdAt),
        updatedAt: new Date(toggledTask.updatedAt),
      };
      dispatch({ type: "UPDATE_TASK", payload: task });
    } catch (error) {
      console.error("Error toggling task:", error);
      throw error;
    }
  };

  const getTask = (id: string): Task | undefined => {
    return state.tasks.find((task) => task.id === id);
  };

  const value: TaskContextType = {
    state,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
