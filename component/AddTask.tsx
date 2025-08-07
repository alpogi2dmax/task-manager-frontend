
import React, { useState, useTransition, useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { addTaskAction } from "@/lib/actions"
import './addtask.css'

interface AddTaskProps {
  setIsAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddTask({ setIsAddingTask }: AddTaskProps) {

    const { user, setTasks, tasks, token } = useContext(UserContext)

    const [error, setError] = useState<string | null>('')
    const [isPending, startTransition] = useTransition()

    async function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault()
            setError('')
            const formData = new FormData(e.currentTarget)

            // ✅ Add user_id manually
            if (user) {
                formData.append('user_id', user.id.toString())
            } else {
                setError('You must be logged in to add a task.')
                return
            }
    
            startTransition(async () => {
                try {
                    const result = await addTaskAction(formData, token)
                    setTasks(prevTasks => [...prevTasks, result.data])
                    setIsAddingTask(false)
                } catch (err: any) {
                    setError(err.message || 'Add Task Failed')
                }
            })
        }

    return (
        <form onSubmit={handleAddTask} className='add-task-form'>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className='single-input'>
                <label htmlFor='title'>Title</label>
                <input name='title' type='text' placeholder='Task Title' required />
            </div>
            <div className='single-input'>
                <label htmlFor='description'>Description</label>
                <textarea name='description' placeholder='Task Description' required />
            </div>
            <div className='button-wrapper'>
                <button 
                    type='submit' 
                    disabled={isPending}
                >
                    {isPending ? 'Adding...' : 'Add Task'}
                </button>
            </div>
        </form>
    )
}