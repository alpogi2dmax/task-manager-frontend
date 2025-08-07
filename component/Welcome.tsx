import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import type { UserContextType } from "@/types/user"
import { logout } from "@/lib/logout";
import './welcome.css'


export function Welcome () {

    const { user, setUser, setTasks } = useContext(UserContext) as UserContextType

    if (!user) {
    return <p>User not found.</p>
  }

    return (
        <div className='welcome-container'>
            <h1>Welcome {user.username}!</h1>
                <div className='welcome-button-container'>
                    <button onClick={async () => {
                        await logout()
                        setUser(null)
                        setTasks([])
                    }}>
                        Logout
                    </button>
                </div>
        </div>

    )
}