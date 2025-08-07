'use client'

import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { Task } from "@/types/user"
import { Check, Trash2, Pencil } from "lucide-react"
import type { UserContextType } from "@/types/user"
import Link from 'next/link'
import './taskdetails.css'
import { handleChangeStatus, handleDeleteTask } from "@/lib/taskHandlers"
import { updateTaskStatus, updateTask } from "@/lib/actions"
import { Welcome } from "@/component/Welcome"

interface Props {
    params: {
        id: string
    }
}

// Wrapper component that handles the undefined case
export default function TaskDetailsWrapper({ params }: Props) {
  const { tasks } = useContext(UserContext) as UserContextType
  const taskDetail = tasks.find(task => task.id.toString() === params.id)

  if (!taskDetail) {
    return <p>Task not found or not loaded yet.</p>
  }

  return <TaskDetails taskDetail={taskDetail} />
}

function TaskDetails({ taskDetail }: { taskDetail: Task }) {

    const { user, token, setTasks } = useContext(UserContext) as UserContextType
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(taskDetail?.title ?? '')
    const [editedDescription, setEditedDescription] = useState(taskDetail?.description ?? '')

    if (!taskDetail) {
        return <p>Task not found or not loaded yet.</p>
    }

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
            alert('Failed to updated task')
        }
    }

    const handleDelete = async () => {
        try {
            await handleDeleteTask(taskDetail, token, setTasks)
            router.push('/')
        } catch (error) {
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