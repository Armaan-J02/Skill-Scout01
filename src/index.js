import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home'; // Make sure there's only one import statement for Home
import JoinNow from './pages/joinnow/joinnow';
import InfoEntry from './pages/infoentry/infoentry';
import Feed from './pages/feed/feed';
import Services from './pages/services/services';
import Contact from './pages/contact/contact';
import About from './pages/about/about';
import ResumeUp from './pages/resumeup/resumeup';
import SignLog from './pages/signlog/signlog';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/joinnow" element={<JoinNow />} />
        <Route path="/info-entry" element={<InfoEntry />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/resumeup" element={<ResumeUp/>} />
        <Route path="/signlog" element={<SignLog/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();