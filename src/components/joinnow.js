
import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';

function JoinNow(props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //const history = useNavigate();
    function handleJoinNow(e) {
        e.preventDefault();
        
        props.toggle();
    }

    function isPasswordValid(password) {
        const alphanumericRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/;
        return alphanumericRegex.test(password);
    }

    function arePasswordsMatched() {
        return password === confirmPassword;
    }

    const isJoinNowDisabled = !isPasswordValid(password) || !arePasswordsMatched();

    return (
        //<Router>
        <div className="popup">
            <div className="popup-inner">
                <h2>Join Now</h2>
                <form onSubmit={handleJoinNow}>
                    <label>
                        Email Address:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    {password && (
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </label>
                    )}
                    {!isPasswordValid(password) && (
                        <p>Password should contain a mix of alphanumeric and special characters.</p>
                    )}
                    {!arePasswordsMatched() && (
                        <p>Passwords do not match.</p>
                    )}
                
                <button type="submit" disabled={isJoinNowDisabled}>
                Join Now
                </button>
                    
                </form>
            </div>
        </div>//<Link path="./skill-scout/src/signup.js" component={Signup} />
        //</Router>
        );
};

export default JoinNow
