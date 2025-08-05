"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TaskCard } from "./components/TaskCard";
import { useTaskContext } from "./context/TaskContext";
import { Header } from "./components/Header";
import { GoPlusCircle } from "react-icons/go";

export default function Home() {
  const router = useRouter();
  const { state } = useTaskContext();
  const { tasks, loading } = state;

  const completedTasks = tasks.filter((task) => task.completed);
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="mx-auto w-full flex flex-col items-center gap-12">
        <div className="w-full flex flex-col items-center">
          <Header />

          <div className="relative -mt-14 mb-6" style={{ width: "736px" }}>
            <button
              onClick={() => router.push("/create")}
              className="w-full px-6 py-3 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg"
              style={{
                background: "linear-gradient(to right, #1E6F9F, #2B8FD1)",
              }}
            >
              <span className="text-sm font-bold text-gray-100">
                Create Task
              </span>
              <GoPlusCircle size={20} style={{ color: "#F2F2F2" }} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4" style={{ width: "736px" }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span style={{ color: "#4EA8DE" }} className="font-medium">
                  Tasks
                </span>
                <span className="bg-gray-700 text-white text-xs font-bold px-2 py-[2px] rounded-full min-w-6 h-5 text-center">
                  {totalTasks}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span style={{ color: "#8284FA" }} className="font-medium">
                  Completed
                </span>
                <span className="bg-gray-700 text-white text-xs font-bold px-2 py-[2px] rounded-full min-w-6 h-5 text-center">
                  {totalTasks === 0
                    ? "0"
                    : `${completedCount} de ${totalTasks}`}
                </span>
              </div>
            </div>
            {totalTasks === 0 && (
              <div className="w-full h-px bg-gray-600"></div>
            )}
          </div>

          {totalTasks === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 text-gray-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                You don&apos;t have any tasks registered yet.
              </h3>
              <p className="text-gray-500">
                Create tasks and organize your to-do items.
              </p>
            </div>
          ) : (
            <div className="space-y-4 gap-3" style={{ width: "736px" }}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
