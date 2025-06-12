import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import styles from './register.module.css';

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';

const Register = () => {
 const [form, setForm] = useState({ username: '', email: '', password: '' });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  if (!form.username || !form.email || !form.password) {
    setError('All fields are required');
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`, 
      form,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data.success) {
      alert('Registration successful! Please login.');
      navigate('/login');
    } else {
      setError(response.data.message || 'Registration failed');
    }
  } catch (err) {
    console.error('Registration error:', err);
    setError(
      err.response?.data?.message || 
      err.message || 
      'Registration failed. Please try again.'
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <Box className={styles.registerContainer}>
      <Box className={styles.registerCard}>
        <Typography variant="h4" className={styles.registerTitle}>
          Create Account
        </Typography>
        <Typography variant="subtitle1" className={styles.registerSubtitle}>
          Please fill in the form to register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            name="username"
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" sx={{ fontWeight: 500 }}>
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
