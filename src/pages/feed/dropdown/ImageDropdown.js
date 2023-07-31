import React, { useState } from 'react';
import './ImageDropdown.css';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import dp from './dp.png';

const ImageDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleImageClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="image-dropdown">
      <img src={dp} alt="Your Profile" onClick={handleImageClick}/>
      {dropdownVisible && (
        <div className="dropdown-content">
          <a href="#">Your Info</a>
          <a href="#">Applications</a>
          <a href="#">Preferences</a>
          <Link to="/home">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default ImageDropdown;
