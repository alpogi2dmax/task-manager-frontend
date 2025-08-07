import React, { useState, useTransition, useContext } from 'react'
import { loginAction } from '@/lib/actions'
import { UserContext } from '@/context/UserContext'
import type {User} from '@/types/user'
import Link from 'next/link'
import './login.css'

interface LoginProps {
    onLoginSuccess: (user: User, token: string) => void
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [error, setError] = useState('')
    const [isPending, startTransition] = useTransition()

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')
        const formData = new FormData(e.currentTarget)

        startTransition(async () => {
            try {
                const result = await loginAction(formData)
                localStorage.setItem('token', result.token)
                onLoginSuccess(result.user, result.token)
            } catch (err: any) {
                setError(err.message || 'Login failed')
            }
        })
    }



    return (
        <div className='login-page'>
            <h1>Login</h1>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label htmlFor='userName'>Username</label>
                <input name='username' type='text' placeholder='Type your username' required />
                <label htmlFor='password'>Password</label>
                <input name='password' type='password' placeholder='Type your password' required />
                <button type='submit' disabled={isPending}>
                    {isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <h2><Link href='/signup/'>Sign Up</Link></h2>
        </div>
    )
}