import type { Task } from "../../../domain/task/task.type"

// Comentario: Este componente representa un item de tarea en la lista de tareas. Muestra el título de la tarea, el nombre de la persona asignada y un botón para marcar la tarea como completada. Si la tarea ya está completada, el título se muestra con una línea tachada.

type Props = {
  task: Task;
  onComplete: (id: string) => void;
}

export default function TaskItem({task, onComplete}: Props) {

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded shadow">
      <div className="flex flex-col items-start gap-3">
        {
          task.completed ? (
            <span className="text-gray-800 line-through">{task.title}</span>
          ) : (
            <span className="text-gray-800">{task.title}</span>
          )
        }
        <span className="text-gray-800">{task.assignedtoName}</span>
      </div>
      <div className="flex flex-row gap-2">
          <button 
            type="button" 
            onClick={() => onComplete(task.id)}
            className="bg-green-200 hover:bg-green-400 p-4 text-green-500 hover:text-green-700">
              Completada
          </button>
      </div>
    </div>
  )
}
