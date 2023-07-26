// infoentry.js

import React, { useState } from 'react';
import './infoentry.css';

const InfoEntry = () => {
  const [educations, setEducations] = useState([
    {
      education: '',
      degree: '',
      major: '',
      gpa: '',
    },
  ]);

  const educationOptions = ['Undergraduate', 'Postgraduate', 'Doctorate'];
  const degreeOptions = {
    Undergraduate: ['B.Tech', 'B.Sc', 'B.A', 'B.Com'],
    Postgraduate: ['M.Tech', 'M.Sc', 'M.A', 'M.Com'],
    Doctorate: ['Ph.D'],
  };

  const majorOptions = {
    'B.Tech': ['Computer Science', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
    'B.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    'B.A': ['English', 'History', 'Economics', 'Political Science', 'Sociology'],
    'B.Com': ['Commerce', 'Accounting', 'Finance', 'Economics'],
    'M.Tech': ['Computer Science', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
    'M.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    'M.A': ['English', 'History', 'Economics', 'Political Science', 'Sociology'],
    'M.Com': ['Commerce', 'Accounting', 'Finance', 'Economics'],
    'Ph.D': ['Research Area 1', 'Research Area 2', 'Research Area 3'],
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };

  const handleAddEducation = () => {
    setEducations([...educations, { education: '', degree: '', major: '', gpa: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  return (
    <div className="info-entry">
      <h2 className="heading">Personal Info</h2>
      <div className="name-section">
        <label>First name:</label>
        <input type="text" />
        <label>Middle name:</label>
        <input type="text" />
        <label>Last name:</label>
        <input type="text" />
      </div>
      <div className="sex-section">
        <label>Sex:</label>
        <input type="radio" name="sex" value="male" /> Male
        <input type="radio" name="sex" value="female" /> Female
        <input type="radio" name="sex" value="others" /> Others
      </div>
      <div className="age-section">
        <label>Age:</label>
        <input type="text" placeholder="dd/mm/yyyy" />
      </div>
      
      <h2 className="heading">Contact Info</h2>
      <div className="contact-section">
        <label>Email ID:</label>
        <input type="email" />
        <label>Phone No:</label>
        <input type="tel" />
        <label>Mobile No:</label>
        <input type="tel" />
        <label>LinkedIn Profile:</label>
        <input type="url" />
        <label>Github Profile:</label>
        <input type="url" />
        <label>Twitter:</label>
        <input type="url" />
        <label>Other Profiles:</label>
        <input type="url" />
      </div>
      
      <h2 className="heading">Educational Details</h2>
      {educations.map((educationItem, index) => (
        <div key={index} className="education-section">
          <label>Educational Level:</label>
          <select
            value={educationItem.education}
            onChange={(e) => handleEducationChange(index, 'education', e.target.value)}
          >
            <option value="">Select</option>
            {educationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label>Degree:</label>
          <select
            value={educationItem.degree}
            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
            disabled={!educationItem.education}
          >
            <option value="">Select</option>
            {degreeOptions[educationItem.education]?.map((deg) => (
              <option key={deg} value={deg}>
                {deg}
              </option>
            ))}
          </select>

          <label>Major/Course:</label>
          <select
            value={educationItem.major}
            onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
            disabled={!educationItem.degree}
          >
            <option value="">Select</option>
            {majorOptions[educationItem.degree]?.map((maj) => (
              <option key={maj} value={maj}>
                {maj}
              </option>
            ))}
          </select>
          <label>Gpa:</label>
          <input
            type="text"
            value={educationItem.gpa}
            onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
          />
          {index !== 0 && <button onClick={() => handleRemoveEducation(index)}>-</button>}
        </div>
      ))}
      <button onClick={handleAddEducation}>+</button>
    </div>
  );
};

export default InfoEntry;
