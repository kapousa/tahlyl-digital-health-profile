// src/components/Login.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Import UserContext

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Get login from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await login(data.access_token);
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </form>
        <Typography align="center" mt={2}>
          Don't have an account? <Link component="button" variant="body2" onClick={() => navigate('/register')}>Register here</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;