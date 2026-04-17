import { useState, useEffect } from "react";
import type { Task } from "../../domain/task/task.types";
import validateTaskTitle from "../../domain/task/task.validators";
import generateId from "../../shared/generateId.util";
import { getAllTasks, saveTask, deleteTaskRecord } from "../../shared/database";

export default function useTaskActions() {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const data = await getAllTasks();
      setTasks(data);
    }
    loadTasks();
  }, []);

  const addTask = async (title: string, file: File | null = null) => {
    if (!validateTaskTitle(title))
      return;

    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
      addedAt: new Date(),
    };
    
    if (file) {
      newTask.attachment = file;
    }

    try {
      await saveTask(newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (e) {
      console.error("Error saving task to DB", e);
    }
  }

  const onComplete = async (id: string) => {
    const taskToUpdate = tasks.find(t => t.id === id);
    if (!taskToUpdate) return;
    
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    try {
      await saveTask(updatedTask);
      setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? updatedTask : task));
    } catch (e) {
      console.error("Error updating task in DB", e);
    }
  }

  const onDelete = async (id: string) => {
    try {
      await deleteTaskRecord(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (e) {
      console.error("Error deleting task from DB", e);
    }
  }

  const onDeleteAttachment = async (id: string) => {
    const taskToUpdate = tasks.find(t => t.id === id);
    if (!taskToUpdate) return;
    
    const updatedTask = { ...taskToUpdate };
    delete updatedTask.attachment;
    
    try {
      await saveTask(updatedTask);
      setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? updatedTask : task));
    } catch (e) {
      console.error("Error deleting task attachment in DB", e);
    }
  }

  return {
    tasks,
    addTask,
    onComplete,
    onDelete,
    onDeleteAttachment,
  }
}
