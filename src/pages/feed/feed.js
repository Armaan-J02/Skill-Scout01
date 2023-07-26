import React,{ useState } from 'react';
import DropDownMenu from './dropdown/ImageDropdown';
import Dropdown from 'react-dropdown-select';
//import './feed.css';
import logo from './logo1.png';
import icon from './blacki.png';
import LeftLine from './component/LeftLine';
import ImageDropdown from './dropdown/ImageDropdown';

function Feed(props) {
    const posts = [
      {
        title: 'Applications',
        content: 'The Applications a person has applied',
      },
      {
        title: 'Skills Required',
        content: 'Skills Required Based on your Interests',
      },
      {
        title: 'News',
        content: 'News Regarding Hiring on our website and etc',
      },
    ];
    return (
      <div className="feed">
          <div className="header">
            <img src={icon} alt="Icon" className="logo-icon" />
            <nav className="navigation">
              <a href="#">About</a> 
              <a href="#">Services</a>
              <a href="#">Contact</a>
              <ImageDropdown />
            </nav>
        </div>
        <LeftLine />
        <div className="background-image"></div>
        <div>
              {posts.map((post, index) => (
                <div key={index}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </div>
              ))}
            </div>
        </div>
    );
  }
  export default Feed;