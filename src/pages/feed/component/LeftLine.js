import React from 'react';

const LeftLine = () => {
  const leftMarginStyle = {
    display: 'flex',
    backgroundColor: '',
    height: '100vh',
    width: '30vh',
    marginLeft: '10px',
  };

  const lineStyle = {
    width: '2px', // Adjust the value to set the width of the line
    backgroundColor: '#000', // Set the color of the line
    marginRight: '20px', // Adjust the value to set the distance between the line and content
  };

  return (
    <div style={leftMarginStyle}>
      <div>
        <h1>Applications</h1>
        <p>The Applications a person has applied</p>
        <h1>Skills Required</h1>
        <p>Skills Required Based on your Interests</p>
        <h1>News</h1>
        <p>News Regarding Hiring on our website and etc</p>
      </div>
      <div style={lineStyle}></div>
    </div>
  );
};

export default LeftLine;
