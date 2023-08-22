import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ResumeUp = () => {
const [resumeFile, setResumeFile] = useState(null);
const handleResumeFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setResumeFile(selectedFile);

    
    // Automatically initiate upload when a file is selected
    if (selectedFile) {
      const formData = new FormData();
      formData.append('resume', selectedFile);

      try {
        await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Resume uploaded successfully!');
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    }
  };
  const navigate =  useNavigate();
const handlesubmit = async (event) => {
    navigate('/info-entry')

}
return  (
    <div className="UpResume">
        <h2 className="heading">Resume</h2>
        <label>Upload your Resume:</label>
        <input type="file" accept=".pdf,.doc,.docx, .txt" onChange={handleResumeFileChange} />
        <button onClick={handlesubmit}>Submit</button>
    </div>
    );
};
export default ResumeUp;
