
import {useState} from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (name: string, studentKey: string) => Promise<void>;
}

export default function StudentRegisterDialog ({
  isOpen,
  onClose,
  onRegister
}: Props) {
  const [name, setName] = useState('');
  const [studentKey, setStudentKey] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para registrar al estudiante
    console.log('Nombre:', name);
    console.log('Matrícula:', studentKey);
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Registrar Estudiante</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Nombre" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input 
            type="text" 
            placeholder="Matrícula" 
            value={studentKey} 
            onChange={(e) => setStudentKey(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Registrar
          </button>
        </form>
      </div>
    </div>
  )
}

