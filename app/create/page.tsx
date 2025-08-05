"use client";

import React from "react";
import { TaskForm } from "../components/TaskForm";
import { Header } from "../components/Header";

export default function CreateTask() {
  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="mx-auto w-full flex flex-col items-center gap-6">
        <Header />
        <div style={{ width: "736px" }}>
          <TaskForm />
        </div>
      </div>
    </main>
  );
}
