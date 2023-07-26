
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './joinnow.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Button, Divider, Paper } from "@mui/material";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


function JoinNow(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleJoinNow = (e) => {
    e.preventDefault();
  };


  return (
    <div className="jpage">
      <h2>Join Now</h2>
      <form onSubmit={handleJoinNow}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email Address:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Join Now</button>
      </form>
    </div>
  );
}

export default JoinNow;
