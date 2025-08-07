'use client'

import Image from "next/image";
import { JSX, useContext, useState, useTransition } from "react";
import { UserContext } from "@/context/UserContext";
import Login from "@/component/Login";
import { AddTask } from "@/component/AddTask";
import { loginAction } from "@/lib/actions";
import { TaskTable } from "@/component/TaskTable";
import { logout } from "@/lib/logout";
import { Trash2 } from 'lucide-react'


export default function Home(): JSX.Element {

  const { user, setUser, tasks, setTasks, token, setToken } = useContext(UserContext)

  const [isAddingTask, setIsAddingTask] = useState(false)

  function handleLoginSucess(user: any, token: string): void {
    setUser(user)
    setTasks([...user.tasks])
    setToken(token)
  }

  function handleAddTask() {
    setIsAddingTask(prev => !prev)
  }

  if (!user) return <Login onLoginSuccess={handleLoginSucess} />

  return (
    <main>
      <div className='welcome-container'>
        <h1>Welcome {user.username}!</h1>
        <div className ='welcome-button-container'>
          <button onClick={async () => {
            await logout()
            setUser(null)
            setTasks([])
          }}>
            Logout
          </button>
        </div>
      </div>
      <TaskTable />
      <button onClick={handleAddTask}>{isAddingTask ? 'Cancel' : 'Add Task'}</button>
      {isAddingTask && <AddTask setIsAddingTask={setIsAddingTask} />}
    </main>
  );
}
