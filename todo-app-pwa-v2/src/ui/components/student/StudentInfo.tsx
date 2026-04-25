import type { Student } from "../../../domain/student/student.type"
  
type Props = {
  student: Student;
  onRegisterStudentOpen: () => void;
}

export default function StudentInfo({student, onRegisterStudentOpen}: Props) {

  return (
    <div className="flex items-start justify-between p-4 bg-white rounded shadow">
      <div className="flex flex-col items-start gap-3">
        <span className="text-gray-800">Nombre: {student.name}</span>
        <span className="text-gray-800">Matricula: {student.studentKey}</span>
      </div>

      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={onRegisterStudentOpen}>
          Registrar
      </button>
    </div>
  )
}
