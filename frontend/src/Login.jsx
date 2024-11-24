import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';  // Import the loading spinner

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);  // Show loading spinner

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      setLoading(false);  // Hide loading spinner

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('access_token', token);
        setMessage('Login successful');
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || 'Invalid username or password');
      }
    } catch (error) {
      setLoading(false);  // Hide loading spinner
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {loading && <LoadingSpinner />}  {/* Show the spinner if loading */}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
