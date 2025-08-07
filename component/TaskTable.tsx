import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { Check, Trash2 } from "lucide-react"
import { updateTaskStatus, deleteTask } from "@/lib/actions"
import { Task, UserContextType } from "@/types/user"
import Link from 'next/link'
import { handleChangeStatus, handleDeleteTask } from "@/lib/taskHandlers"
import './taskcard.css'

export function TaskTable() {

    const { tasks, setTasks, token } = useContext(UserContext) as UserContextType

    function taskCount(status: boolean) {
        return (tasks.filter(task => task.completed === status).length)
    }

    return (
        <div>
            <p className='task-count'>{taskCount(true)} completed {taskCount(false)} pending</p>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <div>
                    {tasks.map(task => (
                        <div key={task.id} className={`task-card ${task.completed ? 'completed' : 'ongoing'}`}>
                            <p style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                                <Link href={`/taskDetails/${task.id}`}>{task.title}</Link>
                            </p>
                            <div className='task-actions'>
                                <button onClick={() => handleChangeStatus(task, token, setTasks)} className='status-button'>
                                    {task.completed ? (
                                        <div className='check-box'>
                                            <Check className='check-icon' />
                                        </div>
                                    ) : (
                                        <Check className='check-icon' />
                                    )}
                                </button>
                                <button className='delete-task' onClick={() => handleDeleteTask(task, token, setTasks)}>
                                    <Trash2 className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}