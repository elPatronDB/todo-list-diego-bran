import TaskItem from "./TaskItem";
import type { Task } from "../../../domain/task/task.types"

export default function TaskList() {

  const tasks: Task[] = [
    {
      id: "1",
      title: "Tarea de ejemplo 1",
      completed: false,
      addedAt: new Date(),
    },
    {
      id: "2",
      title: "Tarea de ejemplo 2",
      completed: true,
      addedAt: new Date(),
    },
  ]

  const completeTask = (id: string) => {
    console.log("Tarea completada:", id);
  }

  const deleteTask = (id: string) => {
    console.log("Tarea eliminada:", id);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onComplete={completeTask} onDelete={deleteTask} />
        ))}
      </div>
    </>
  )
}