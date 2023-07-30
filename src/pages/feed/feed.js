import React,{ useState } from 'react';
import DropDownMenu from './dropdown/ImageDropdown';
import Dropdown from 'react-dropdown-select';
//import './feed.css';
import logo from './logo1.png';
import icon from './blacki.png';
import LeftLine from './component/LeftLine';
import ImageDropdown from './dropdown/ImageDropdown';
import Feed1 from './component/FeedBasic';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Feed(props) {
    return (
      <div className="feed">
          <div className="header">
            <img src={icon} alt="Icon" className="feed-logo" />
            <nav className="navigation">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/joinnow">Join Now</Link>
          <ImageDropdown />
        </nav>
        </div>
        <div className='main-container'>
        <LeftLine />
        <Feed1 />
        </div>
        
        </div>
    );
  }
  export default Feed;