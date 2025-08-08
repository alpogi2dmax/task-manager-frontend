export async function logout(): Promise<void> {
    const token: string | null = localStorage.getItem('token');
    if (token) {
        await fetch('https://task-manager-backend-dsy7.onrender.com/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
    localStorage.removeItem('token')
}