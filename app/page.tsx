'use client'


import { JSX, useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Login from "@/component/Login";
import { AddTask } from "@/component/AddTask";
import type { User } from "@/types/user";
import { TaskTable } from "@/component/TaskTable";
import { Welcome } from "@/component/Welcome";



export default function Home(): JSX.Element {

  const { user, setUser, setTasks, setToken } = useContext(UserContext)

  const [isAddingTask, setIsAddingTask] = useState(false)

  function handleLoginSucess(user: User, token: string): void {
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
      {/* <div className='welcome-container'>
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
      </div> */}
      <Welcome />
      <TaskTable />
      <button onClick={handleAddTask}>{isAddingTask ? 'Cancel' : 'Add Task'}</button>
      {isAddingTask && <AddTask setIsAddingTask={setIsAddingTask} />}
    </main>
  );
}
