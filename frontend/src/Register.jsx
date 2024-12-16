import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);
    setPasswordError(''); 
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          email,
          password,
        }),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        setMessage('Registration successful');
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleRegister}>
        <label htmlFor="username">
          Username:
          <br />
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <br />
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <br />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="confirm-password">
          Confirm Password:
          <br />
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      <p className="message">{message}</p>
    </div>
  );
};

export default Register;
