import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signlog.css';
import {Box, Button, TextField, Typography} from '@mui/material';
import axios from 'axios';

function SignLog() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSign = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/api/login', { email, password });
          const data = response.data;
          console.log(data);
          if (response.status === 200) {
            localStorage.setItem('token', data.token);
            navigate('/resumeup');
          } else {
            console.error('Login failed:', data.error)
          }
        } catch (error) {
          console.error('An error occurred:', error);
               
        }
      };
    return (
        <Box className="spage" component="form" onSubmit={handleSign}>
            <Typography variant="h2" align="center">
                Sign In
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                    required
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder='Email'
                />
                <TextField
                    required
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder='Password'
                />
            <button onClick={handleSign}>Login</button>
            <p>
                    <a href="#">Forgot Password?</a>
            </p>
            </Box>
        </Box>
    );
            }
export default SignLog;
