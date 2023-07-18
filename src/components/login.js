
import React, { useState } from 'react';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        // Code to handle login goes here
        props.toggle();
    }

    function isEmailValid(email) {
        return email.includes('@');
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Email Address:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    {!isEmailValid(email) && <p>Please enter a valid email address.</p>}
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p>
                    <a href="#">Forgot Password?</a>
                </p>
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    );
};

export default Login
