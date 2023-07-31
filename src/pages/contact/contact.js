import React from 'react';
import '../home/home.css';
import logo from './logo1.png';
import icon from './blacki.png';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="about-page">
      <div className="about-header">
      <Link to='/home'>
        <img src={icon} alt="Icon" className="logo-icon" />
        </Link>
          <nav className="navigation">
          <Link to="/about" /*onClick={handleLinkClick}*/>About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/joinnow">Join Now</Link>
        </nav>
      </div>
      <div className="about_body">
    <div>
      <h1>Contact Us</h1>
      <p>
        If you have any questions or inquiries about our Applicant Tracking System (ATS) services, feel free to get in touch with our team.
      </p>
      <p>
        Contact Information:
      </p>
      <ul>
        <li>Email: info@exampleats.com</li>
        <li>Phone: +1 (555) 123-4567</li>
        <li>Address: 123 Main Street, City, State, Zip</li>
      </ul>
      <p>
        Our dedicated support team is available to assist you with any issues or concerns related to our ATS. We strive to provide excellent customer service and ensure a smooth experience for our clients.
      </p>
    </div>
    </div>
    </div>
  );
};
export default Contact;
