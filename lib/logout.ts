export async function logout(): Promise<void> {
    const token: string | null = localStorage.getItem('token');
    if (token) {
        await fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
    localStorage.removeItem('token')
}