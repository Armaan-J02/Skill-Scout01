import React from 'react';

const LeftLine = () => {
  const leftMarginStyle = {
    display: 'flex',
    flexDirection: 'column',  // Display the content in a column
    backgroundColor: '#b0f5eb',
    height: '100vh',
    width: '40vh',
    marginTop: '35px',
    marginRight: '10px',
    alignItems: 'center',     // Center content horizontally
  };
  
  const lineStyle = {
    width: '2px',             // Adjust the value to set the width of the line
    backgroundColor: '#000000', // Set the color of the line
    margin: '20px', 
    marginLeft: '50px',         // Set the distance between the line and content
  };


  return (
    <div style={leftMarginStyle}>
      <div>
        <h1>  Applications</h1>
        <p>  The Applications a person has applied</p>
        <h1>  Skills Required</h1>
        <p>  Skills Required Based on your Interests</p>
        <h1>  News</h1>
        <p>  News Regarding Hiring on our website and etc</p>
      </div>
      <div style={lineStyle}></div>
    </div>
  );
};

export default LeftLine;

