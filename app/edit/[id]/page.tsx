"use client";

import React from "react";
import { useParams } from "next/navigation";
import { TaskForm } from "../../components/TaskForm";
import { Header } from "../../components/Header";

export default function EditTask() {
  const params = useParams();
  const taskId = params.id as string;

  console.log("EditTask render:", { taskId });

  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="mx-auto w-full flex flex-col items-center gap-6">
        <Header />
        <div style={{ width: "736px" }}>
          <TaskForm taskId={taskId} isEdit={true} />
        </div>
      </div>
    </main>
  );
}
