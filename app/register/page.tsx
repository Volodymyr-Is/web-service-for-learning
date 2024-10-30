"use client";
import { useState } from 'react';
import Cookies from 'js-cookie';
import './styles.css';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            Cookies.set('token', data.token, { expires: 1 });
            console.log('Registration successful!');
        } else {
            const errorData = await response.json();
            setError(errorData.error);
            console.error('Error registering:', errorData.error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleRegister} className="form">
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
                <a href="/login" style={{color: "black"}}>Login</a>
            </form>
        </div>
    );
}
