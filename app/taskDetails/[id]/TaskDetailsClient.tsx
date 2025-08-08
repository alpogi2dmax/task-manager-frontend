'use client'

import { useContext, useState, useEffect } from "react"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { Check, Trash2, Pencil } from "lucide-react"
import type { UserContextType } from "@/types/user"
import type { Task } from "@/types/user"
import Link from 'next/link'
import './taskdetails.css'
import { handleChangeStatus, handleDeleteTask } from "@/lib/taskHandlers"
import { updateTask } from "@/lib/actions"
import { Welcome } from "@/component/Welcome"

interface Props {
  taskId: string
}

export default function TaskDetailsClient({ taskId }: Props) {
  const { tasks } = useContext(UserContext) as UserContextType
  const taskDetail = tasks.find(task => task.id.toString() === taskId)

  if (!taskDetail) {
    return <p>Task not found or not loaded yet.</p>
  }

  return <TaskDetailsInner taskDetail={taskDetail} />
}

function TaskDetailsInner({ taskDetail }: { taskDetail: Task }) {
  const { token, setTasks } = useContext(UserContext) as UserContextType
  const router = useRouter()

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      router.push('/')  // or whatever your login route is
    }
  }, [token, router])

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(taskDetail?.title ?? '')
  const [editedDescription, setEditedDescription] = useState(taskDetail?.description ?? '')

  async function handleSave() {
    if (!token) {
      console.error("No token provided")
      return
    }

    try {
      const updated = await updateTask(taskDetail.id, editedTitle, editedDescription, token)
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
      setIsEditing(false)
    } catch {
      alert('Failed to update task')
    }
  }

  const handleDelete = async () => {
    try {
      await handleDeleteTask(taskDetail, token, setTasks)
      router.push('/')
    } catch {
      alert('Failed to delete task.')
    }
  }

  return (
    <div className='task-wrapper'>
      <Welcome />
      <div className='page-wrapper'>
        <div className='task-details'>
          <div className='back-link-wrapper'>
            <Link href='/'>Back to Main</Link>
          </div>
          {isEditing ? (
            <>
              <div className="task-object">
                <label>Title</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={e => setEditedTitle(e.target.value)}
                />
              </div>
              <div className="task-object">
                <label>Description</label>
                <textarea
                  value={editedDescription}
                  onChange={e => setEditedDescription(e.target.value)}
                />
              </div>
              <div className="task-detail-actions">
                <button onClick={handleSave} className='edit-button'>Save</button>
                <button className='edit-button' onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="task-object">
                <h1>Title</h1>
                <h2>{taskDetail.title}</h2>
              </div>
              <div className="task-object">
                <h1>Description</h1>
                <h2>{taskDetail.description}</h2>
              </div>
              <div className="task-detail-actions">
                <button onClick={() => setIsEditing(true)}><Pencil /></button>
                <button onClick={() => handleChangeStatus(taskDetail, token, setTasks)}>
                  {taskDetail.completed ? (
                    <div className="check-box">
                      <Check className="check-icon" />
                    </div>
                  ) : (
                    <Check className="check-icon" />
                  )}
                </button>
                <button onClick={handleDelete}><Trash2 /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}