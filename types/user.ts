import type { Dispatch, SetStateAction } from 'react';

export type Task = {
    id: number,
    title: string,
    description: string,
    completed: boolean
    user_id: number
}

export interface User {
    username: string,
    first_name: string,
    last_name: string,
    id: number,
    tasks: Task[]
}

export interface UserContextType {
    user: User | null
    setUser: (user: User | null) => void
    tasks: Task[]
    setTasks: Dispatch<SetStateAction<Task[]>>
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>
}