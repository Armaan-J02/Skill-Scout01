import React from 'react';
import '../home/home.css';
import logo from '../services/logo1.png';
import icon from './blacki.png';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const services = () => {
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
      <h1>Services Page for Applicant Tracking System</h1>
      <p>
        1. Customized ATS Implementation: Tailor-made ATS solution that aligns perfectly with your hiring workflow. Seamless implementation and integration.
      </p>
      <p>
        2. Applicant Tracking & Management: Track and manage job applicants at every stage of the recruitment process. Centralized platform for efficient monitoring.
      </p>
      <p>
        3. Job Posting & Candidate Sourcing: Reach a wider audience with ATS's job posting and candidate sourcing capabilities. Advanced candidate search tools for quick selection.
      </p>
      <p>
        4. Automated Resume Screening: Intelligent algorithms to automate initial resume screening. Shortlist the most qualified candidates based on specific criteria.
      </p>
      <p>
        5. Interview Management: Streamline your interview process with the Interview Management module. Schedule interviews and collect feedback within the ATS.
      </p>
      <p>
        6. Collaboration & Communication: Promote collaboration among team members involved in hiring. Share candidate profiles and communicate through the built-in messaging system.
      </p>
      <p>
        7. Reporting & Analytics: Gain valuable insights into recruitment performance. Monitor key metrics and make data-driven decisions to optimize hiring strategy.
      </p>
      <p>
        8. Mobile Accessibility: Access the ATS on the go with the mobile-friendly interface. Review applications and manage your hiring pipeline from any device.
      </p>
      <p>
        9. Data Security & Compliance: Robust security measures to safeguard sensitive candidate information. Compliant with industry standards.
      </p>
      <p>
        10. Ongoing Support & Training: Comprehensive training and continuous support to ensure optimal ATS usage. Our customer success team is always available to assist.
      </p>
      <p>
        Experience the power of our Applicant Tracking System and take your hiring process to the next level. Contact us today to schedule a demo and learn more about our services.
      </p>
    </div>
    </div>
    </div>
  );
};
export default services;
