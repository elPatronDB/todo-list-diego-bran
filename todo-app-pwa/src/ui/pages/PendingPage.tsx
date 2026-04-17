import {selectPendingTasks } from "../../application/task/useTaskSelectors"
import useTaskActions from "../../application/task/useTaskActions"
import TaskList from "../components/task/TaskList"

function PendingPage() {

  const { tasks, onComplete, onDelete, onDeleteAttachment } = useTaskActions();
  const pendingTasks = selectPendingTasks(tasks);

  return (
    <>
      <>
          <h3>Tareas pendientes</h3>
          <TaskList tasks={pendingTasks} onComplete={onComplete} onDelete={onDelete} onDeleteAttachment={onDeleteAttachment} />
        </>
    </>
  )
}

export default PendingPage
