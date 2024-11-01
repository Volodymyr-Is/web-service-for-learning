import { useState } from 'react';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data);
    } else {
      setError(data.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signIn('facebook');
    } catch (error) {
      console.error("Error during Facebook sign-in:", error);
    }
  };

  const handleTwitterSignIn = async () => {
    try {
      await signIn('twitter');
    } catch (error) {
      console.error("Error during Twitter sign-in:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      
      {/* Форма для стандартного логіну */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Кнопки для логіну через соцмережі*/}
      <div>
        <h2>Or login with</h2>
        <button onClick={handleGoogleSignIn}>Login with Google</button>
        <button onClick={handleFacebookSignIn}>Login with Facebook</button>
        <button onClick={handleTwitterSignIn}>Login with Twitter</button>
      </div>
    </div>
  );
};

export default LoginPage;