import React, { useState } from 'react';
import logo from './logo1.png';
import './App.css';
import icon from './blacki.png';
import { Link, BrowserRouter as Router, Route, useHistory, useNavigate } from 'react-router-dom';
import Login from "./components/login"
import JoinNow from "./components/joinnow.js"



function App() {
    const [loginVisible, setLoginVisible] = useState(false);
    const [joinNowVisible, setJoinNowVisible] = useState(false);
  
    function toggleLogin() {
      setLoginVisible(!loginVisible);
      setJoinNowVisible(false);
    }
  
    function toggleJoinNow() {
      setJoinNowVisible(!joinNowVisible);
      setLoginVisible(false);
    }
  
    return (
        
      <div>
        <div className="header">
        <img src={icon} alt="Icon" className="logo-icon" />
          <nav className="navigation">
            <a href="#">About</a>
            
            <a href="#">Services</a>
            <a href="#">Contact</a>
            <a href="#" onClick={toggleJoinNow}>
              Join now
            </a>
            <button className="signin" onClick={toggleLogin}>
              Login
            </button>
          </nav>
        </div>
        <div className="hero-section">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-image"/>
          </div>
          <div className="background-image"></div>
        </div>
        <div className="content-wrapper">
          <section className="signup-section">
          <div className="signup-content">
                  <p>Welcome to Skill-Scout! Join our platform and unlock a world of opportunities for your career growth and development. Create your account to get started!</p>
                  <p>Stay updated with the latest job opportunities, training recommendations, internship programs, and more! Gain access to our application tracking system, job listings, and personalized recommendations for courses, videos, research papers, and upskilling materials.</p>
              </div>
            </section>
          <section className="benefits-section">
            
          <h3>Benefits of Joining</h3>
                  <ul>
                      <li>Application Tracking: Keep track of your job applications in one place.</li>
                      <li>Job Recommendations: Discover relevant job opportunities based on your skills and interests.</li>
                      <li>Training Recommendations: Get personalized training recommendations to enhance your skills.</li>
                      <li>Internship Programs: Explore internship programs to gain practical experience.</li>
                      <li>Upskilling Resources: Access a curated collection of courses, videos, research papers, and documents to support your professional growth.</li>
                      <li>Easy Apply: Apply to jobs with just a few clicks, making the application process hassle-free.</li>
                  </ul>
          </section>
          <section className="security-section">
          <h3>Trust and Security</h3>
              <p>We prioritize the security of your personal information. Rest assured that your data is protected through advanced security measures and encrypted connections.</p>
          </section>
          <section className="support-section">
          <h3>User Support</h3>
              <p>Our dedicated support team is here to assist you. If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
          </section>
        </div>
        {loginVisible && <Login toggle={toggleLogin} />}
        {joinNowVisible && <JoinNow toggle={toggleJoinNow} />}
      </div>
      
    );
  }


export default App;
