"use client";
import { useState } from 'react';
import Cookies from 'js-cookie';
import './styles.css';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        // Проверка совпадения паролей на фронтенде
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, confirmPassword, name }),
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
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                />
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit">Register</button>
                <a href="/login" style={{color: "black"}}>Login</a>
            </form>
        </div>
    );
}
