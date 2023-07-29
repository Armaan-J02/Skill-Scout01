import React, { useState } from 'react';
import logo from './logo1.png';
import icon from './blacki.png';
import Login from '../../pages/login/login'
import './home.css'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const Home = () => {
  const [loginVisible, setLoginVisible] = useState(false);
    function toggleLogin() {
      setLoginVisible(!loginVisible); 
    }
  return (
    
    <div>
      <div className="header">
        <img src={icon} alt="Icon" className="logo-icon" />
        <nav className="navigation">
          <Link to="/about"> About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/joinnow">Join Now</Link>
          <button className="signin" onClick={toggleLogin}>
              Login
            </button>
        </nav>
      </div>
      <div className="hero-section">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
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
            {/* Benefits list */}
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
    </div>
    
  );
}

export default Home;
