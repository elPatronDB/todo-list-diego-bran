import { useState, useRef } from 'react'

type Props = {
  addTask: (title: string, file: File | null) => void;
}

export default function TaskForm({addTask}: Props) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const addTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(title, file);
    setTitle('');
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <form onSubmit={addTaskSubmit} className="w-full flex flex-col md:flex-row gap-4 mb-4 items-center">
      <input
        type="text"
        value={title}
        placeholder="Detalle de tarea"
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="file-input file-input-bordered file-input-md w-full md:max-w-xs text-sm"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-200 whitespace-nowrap"
      >
        Guardar
      </button>
    </form>
  )
}