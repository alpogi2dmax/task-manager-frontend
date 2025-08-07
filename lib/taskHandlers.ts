import { Task } from "@/types/user"
import { updateTaskStatus, deleteTask } from "@/lib/actions"

export async function handleChangeStatus(
  task: Task,
  token: string | null,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {

  if (!token) {
    console.error("No token provided");
    return;
  }

  try {
    const updatedTask = await updateTaskStatus(task.id, !task.completed, token)
    setTasks(prevTasks =>
      prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
    )
  } catch (error) {
    console.error("Failed to update task status:", error)
  }
}

export async function handleDeleteTask(
  task: Task,
  token: string | null,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {

  if (!token) {
    console.error("No token provided")
    return
  }
  
  try {
    await deleteTask(task.id, token)
    setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id))
  } catch (error) {
    console.error("Failed to delete task:", error)
  }
}