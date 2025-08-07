'use client'

import React, { useState, useTransition } from 'react'
import { registerAction } from '@/lib/actions'
import Link from 'next/link'
import './signup.css'

export default function Signup() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isPending, startTransition] = useTransition()

    async function handleSignup(e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        setError('')
        setSuccess('')

        const form: HTMLFormElement = e.currentTarget as HTMLFormElement

        const formData: FormData = new FormData(form)

        const password: string = formData.get('password') as string
        const confirmPassword: string = formData.get('confirm_password') as string

        if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
        }

        startTransition(async () => {
            try {
                await registerAction(formData)
                setSuccess('Account created! You can now log in.')
            } catch (err: any) {
                setError(err.message || 'Registration failed')
            }
        })
    }

    return (
        <div className='signup-page'>
            <h1>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green '}}>{success}</p>}
            <form onSubmit={handleSignup}>
                <label htmlFor='first_name'>First Name</label>
                <input name='first_name' type='text' required />
                <label htmlFor='last_name'>Last Name</label>
                <input name='last_name' type='text' required />
                <label htmlFor='username'>Username</label>
                <input name='username' type='text' required />
                <label htmlFor='password'>Password</label>
                <input name='password' type='password' required />
                <label htmlFor='confirm_password'>Confirm Password</label>
                <input name='confirm_password' type='password' required />
                <button type='submit' disabled={isPending}>
                    {isPending ? 'Creating account ...' : 'Sign Up'}
                </button>
            </form>
            <h2>Alrady have an account ? <Link href='/'>Login</Link></h2>
        </div>
    )
}