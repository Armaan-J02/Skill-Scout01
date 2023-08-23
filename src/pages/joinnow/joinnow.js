import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import './joinnow.css';
import axios from 'axios';


function JoinNow() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  
  const handleJoinNow = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        navigate('/signlog');
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  function isPasswordValid(password) {
    const alphanumericRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/;
    return alphanumericRegex.test(password);
  }

  function arePasswordsMatched() {
    return password === confirmPassword;
  }

  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isJoinNowDisabled = !isPasswordValid(password) || !arePasswordsMatched() || !isEmailValid(email);

  return (
    <Box className="jpage" component="form" onSubmit={handleJoinNow}>
      <Typography variant="h2" align="center">
        Join Now
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          label="Email Address"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder='Email'
          required
        />
        {!isEmailValid(email) && <Typography color="error">Please enter a valid email address.</Typography>}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} placeholder='Password'
          required
        />
        {password && (
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        {!isPasswordValid(password) && (
          <Typography color="error">Password should contain a mix of alphanumeric and special characters.</Typography>
        )}
        {!arePasswordsMatched() && <Typography color="error">Passwords do not match.</Typography>}
        <Button type="submit" variant="contained" disabled={isJoinNowDisabled}>
          Join Now
        </Button>
      </Box>
    </Box>
  );
}


export default JoinNow;
