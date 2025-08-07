'use client'

import React, { createContext, useState, useEffect, ReactNode, JSX, Dispatch, SetStateAction } from 'react'
import type { User, Task, UserContextType } from '@/types/user'

// interface UserContextType {
//     user: User | null
//     setUser: (user: User | null) => void
//     tasks: Task[]
//     setTasks: Dispatch<SetStateAction<Task[]>>
//     token: string | null;
//     setToken: Dispatch<SetStateAction<string | null>>
// }

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    tasks: [],
    setTasks: () => {},
    token: null,
    setToken: () => {}
})

export function UserProvider({ children }: { children: ReactNode }): JSX.Element {
    const [user, setUser] = useState<User | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedUser: string | null = localStorage.getItem('user')
        const storedToken: string | null = localStorage.getItem('token');
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser)
            setUser(parsedUser)
            setTasks(parsedUser.tasks || [])
        }
        if (storedToken) {
            setToken(storedToken)
        }

    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, tasks, setTasks, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}