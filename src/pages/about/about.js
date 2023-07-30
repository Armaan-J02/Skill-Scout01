import React, { useState } from 'react';
import '../home/home.css';
import logo from './logo1.png';
import icon from './blacki.png';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AboutPage = () => {


  /* Tried Reload Effect
  const [isReloading, setIsReloading] = useState(false);
  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsReloading(true);
    setTimeout(() => {
      window.location.href = '/about'; // Replace with the destination route
    }, 1500); // Set the delay time in milliseconds (e.g., 1500ms = 1.5 seconds)
  };
  */


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
      <h1>Welcome to our Applicant Tracking System (ATS) About Page!</h1>
      <p>
        At [Company Name], we take pride in revolutionizing the way organizations manage their hiring process. 
        Our Applicant Tracking System is designed to simplify and streamline your recruitment journey, empowering 
        you to find the perfect candidates for your team efficiently and effectively.
      </p>
      <h2>Why Choose Our ATS?</h2>
      <ol>
        <li>User-Friendly Interface: Our ATS boasts a clean and intuitive interface, making it easy for both 
            novice and experienced HR professionals to navigate through the system effortlessly. Say goodbye 
            to complex and convoluted hiring platforms!
        </li>
        <li>End-to-End Recruitment Management: From posting job openings to extending job offers, our ATS covers 
            the entire hiring process. Save time and effort with features like automated job postings, candidate 
            screening, interview scheduling, and more.
        </li>
        <li>Customizable Workflows: We understand that every organization has unique hiring needs. Our ATS allows 
            you to customize workflows, stages, and communication templates, ensuring that the system aligns 
            perfectly with your recruitment process.
        </li>
        <li>Collaborative Hiring: Involve your entire team in the hiring process with ease. Our ATS enables seamless 
            collaboration, letting team members leave feedback, rate candidates, and stay informed at every stage.
        </li>
        <li>Powerful Candidate Database: Build and maintain a talent pool that you can tap into for future hiring needs. 
            Our ATS stores candidate data securely and enables you to search for the right talent instantly.
        </li>
        <li>Automated Candidate Screening: Say goodbye to manual resume screening. Our ATS uses intelligent algorithms 
            to match job requirements with candidate profiles, shortlisting the most relevant applicants automatically.
        </li>
        <li>Data-Driven Insights: Make informed decisions with our robust reporting and analytics. Track key hiring 
            metrics, monitor team performance, and gain valuable insights to optimize your recruitment strategy.
        </li>
        <li>Mobile-Friendly: Hiring on-the-go? No problem! Our ATS is mobile-friendly, allowing you to manage your 
            hiring process from your smartphone or tablet, ensuring you never miss a beat.
        </li>
        <li>Seamless Integrations: We understand that your organization may already be using other HR tools. Our ATS 
            seamlessly integrates with various HR software and job boards, making it a natural fit for your existing 
            tech stack.
        </li>
        <li>Dedicated Support: Our team of experts is here to support you at every step of the way. Whether you have 
            questions, need assistance, or want to explore advanced features, we've got your back!
        </li>
      </ol>
      <p>
        Join thousands of companies that have already transformed their hiring process with our Applicant Tracking System. 
        Say hello to efficient, collaborative, and data-driven recruitment that helps you find the best candidates for your team.
      </p>
      <p>
        Ready to take the leap? Get in touch with us today and let's elevate your hiring process together!
      </p>
      <div className="contact-information">
        <p>[Contact Information]</p>
        <p>[Company Name]</p>
        <p>[Address]</p>
        <p>[Email]</p>
        <p>[Phone]</p>
        <p>[Website]</p>
      </div>
      </div>
    </div>
  );
};

export default AboutPage;
