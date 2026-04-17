import { useEffect, useState } from "react";
import type { Task } from "../../../domain/task/task.types"

type Props = {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteAttachment: (id: string) => void;
}

export default function TaskItem({task, onComplete, onDelete, onDeleteAttachment}: Props) {

  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (task.attachment && task.attachment instanceof File) {
      const url = URL.createObjectURL(task.attachment as Blob);
      setAttachmentUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAttachmentUrl(null);
    }
  }, [task.attachment]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded shadow gap-4 border border-gray-100">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          {
            task.completed ? (
              <span className="text-gray-800 line-through">{task.title}</span>
            ) : (
              <span className="text-gray-800 text-lg">{task.title}</span>
            )
          }
        </div>
        {task.attachment && (
          <div className="flex flex-row items-center gap-2 mt-1">
            <a 
              href={attachmentUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-700 underline flex items-center"
            >
              📎 {task.attachment.name || 'Adjunto'}
            </a>
            {onDeleteAttachment && (
              <button 
                type="button" 
                onClick={() => onDeleteAttachment(task.id)}
                className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 ml-2"
                title="Eliminar adjunto"
              >
                ✕ Eliminar archivo
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-2 self-end sm:self-auto shrink-0 mt-2 sm:mt-0">
          <button 
            type="button" 
            onClick={() => onComplete(task.id)}
            className="bg-green-100 px-4 py-2 text-sm rounded hover:bg-green-200 text-green-700 font-medium">
              {task.completed ? "Reabrir" : "Completada"}
          </button>
          <button 
            type="button"
            onClick={() => onDelete(task.id)}
            className="bg-red-100 px-4 py-2 text-sm rounded hover:bg-red-200 text-red-700 font-medium">
              Eliminar Tarea
          </button>
      </div>
    </div>
  )
}
