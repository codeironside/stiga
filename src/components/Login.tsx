
import React, { useState } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Login successful');
                // Redirect or update state as needed (e.g., using React Router)
                window.location.href = '/admin';
            } else {
                setError(data.message || 'Login failed');
                console.error('Login failed:', data.message);
            }
        } catch (err) {
            setError('An error occurred during login.');
            console.error('Error:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-primary-500 mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button type="submit" className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;