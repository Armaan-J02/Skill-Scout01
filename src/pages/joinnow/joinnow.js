
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './joinnow.css';



function JoinNow(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleJoinNow = (e) => {
    e.preventDefault();

  };

  return (
    <div className="join-page">
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
