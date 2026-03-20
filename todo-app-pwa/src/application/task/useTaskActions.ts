import { useState } from "react";
import type { Task } from "../../domain/task/task.types";
import validateTaskTitle from "../../domain/task/task.validators";

export default function useTaskActions() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    
    if (!validateTaskTitle(title))
      return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      addedAt: new Date(),
    }
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  }

  const onComplete = (id: string) => {
    console.log("Tarea completada:", id);
  }

  const onDelete = (id: string) => {
    console.log("Tarea eliminada:", id);
  }

  return {
    tasks,
    addTask,
    onComplete,
    onDelete,
  }
}
