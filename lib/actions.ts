

export async function registerAction(formData: FormData) {
    const res = await fetch ('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password'),
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name')
        })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Registration failed')
    }

    return data
}

export async function loginAction(formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')

    const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Login failed')
    }

    return {
        token: data.access_token,
        user: data.user

    }
}

export async function addTaskAction(formData: FormData, token: string) {
    const title = formData.get('title')
    const description = formData.get('description')
    // const user_id = formData.get('user_id')

    const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({title, description})
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Login failed')
    }

    console.log(data)

    return {
        data
    }
}

export async function updateTaskStatus(taskId: number, completed: boolean, token: string) {
    console.log(`Task Id: ${taskId}` )
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed })
    })

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to update task status')
    }

    return data
}

export async function updateTask(
    id: number,
    title: string,
    description: string,
    token: string
) {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({title, description}),
    })
    if (!res.ok) throw new Error('Failed to update task')
    return res.json()
}


export async function deleteTask(taskId: number, token: string | null) {
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    if (!res.ok) {
        throw new Error('Failed to delete task')
    }
}