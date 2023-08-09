// infoentry.js

import React, { useState } from 'react';
import './infoentry.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    Undergraduate: ['Bachelor of Applied Science(BASc)',
    'Bachelor of Arts(BA)',
    'Bachelor of Business Administration(BBA)',
    'Bachelor of Economics',
    'Bachelor of Management Studies(BMS)',
    'Bachelor Of Science: (BSc)',
    'Bachelor Of Commerce (Bcom)',
    'Bachelor Of Computer Science (BCS)',
    'Bachelor Of Design (B.Des)',
    'Bachelor Of Fine Arts (BFA)',
    'Bachelor Of Laws (LLB)',
    'Bachelor Of Engineering (BEng)',
    'Bachelor Of Technology (BTech)',
    'Bachelor Of Education (BEd)',
    'Bachelor Of Medicine, Bachelor Of Surgery (MBBS)',
    'Bachelor Of Veterinary Science (BVSc)',
    'Bachelor Of Architecture (BArch)'],

    Postgraduate: ['M.Tech', 'M.Sc', 'M.A', 'M.Com'],
    Doctorate: ['Ph.D'],
  };

  const majorOptions = {
'Bachelor Of Technology (BTech)': ['Computer Science', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Aerospace Engineering', 'Chemical Engineering', 'Biotechnology', 'Agricultural Engineering', 'Environmental Engineering', 'Industrial Engineering', 'Aeronautical Engineering', 'Mining Engineering', 'Metallurgical Engineering', 'Textile Engineering', 'Production Engineering', 'Marine Engineering', 'Petroleum Engineering', 'Polymer Engineering', 'Ceramic Engineering', 'Food Technology', 'Nuclear Engineering', 'Instrumentation Engineering', 'Mechatronics Engineering', 'Robotics Engineering'],
    'Bachelor Of Science: (BSc)': ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    'Bachelor of Arts(BA)': ['English', 'History', 'Economics', 'Political Science', 'Sociology'],
    'Bachelor of Business Administration(BBA)': [],
    'Bachelor of Economics': [],
    'Bachelor of Management Studies(BMS)': [],
    'Bachelor of Applied Science (BASc)': ['Applied Physics', 'Applied Chemistry', 'Applied Mathematics', 'Applied Biology', 'Environmental Science and Management', 'Renewable Energy and Sustainable Technologies', 'Materials Science and Engineering', 'Industrial Technology', 'Food Science and Technology', 'Biotechnology', 'Data Science and Analytics', 'Geomatics and Surveying', 'Information Technology and Management', 'Engineering Technology', 'Applied Health Sciences', 'Environmental Engineering Technology', 'Construction Management', 'Quality Management and Assurance', 'Robotics and Automation Technology', 'Applied Electronics and Instrumentation'],
    'Bachelor Of Computer Science (BCS)': ['Computer Science', 'Software Engineering', 'Information Technology', 'Data Science', 'Artificial Intelligence', 'Cybersecurity', 'Web Development', 'Mobile App Development', 'Database Management', 'Networking', 'Machine Learning', 'Game Development', 'Cloud Computing'],
    'Bachelor Of Design (B.Des)': ['Graphic Design', 'Industrial Design', 'Fashion Design', 'Interior Design', 'User Experience (UX) Design', 'User Interface (UI) Design', 'Animation and Multimedia Design', 'Product Design', 'Communication Design', 'Textile Design', 'Jewelry Design', 'Automotive Design', 'Furniture Design', 'Ceramic and Pottery Design', 'Sustainable Design', 'Exhibition Design', 'Interaction Design', 'Game Design', 'Web Design', 'Environmental Design', 'Film and Video Design', 'Costume Design', 'Digital Media Design', 'Experience Design'],
    'Bachelor Of Fine Arts (BFA)': ['Drawing and Painting', 'Sculpture', 'Printmaking', 'Ceramics', 'Photography', 'Graphic Design', 'Illustration', 'Animation', 'Film and Video', 'Digital Arts', 'Textile Arts', 'Mixed Media', 'Installation Art', 'Performance Art', 'Art Education', 'Art History', 'Fine Arts Studio', 'Visual Communication', 'Typography', 'Watercolor Painting', 'Pastel Drawing', 'Collage Art', 'Print Design', 'Book Arts'],
    'Bachelor Of Laws (LLB)': ['Criminal Law', 'Civil Law', 'Constitutional Law', 'Corporate Law', 'International Law', 'Family Law', 'Environmental Law', 'Intellectual Property Law', 'Human Rights Law', 'Labor and Employment Law', 'Tax Law', 'Property Law', 'Administrative Law', 'Commercial Law', 'Tort Law', 'Media Law', 'Immigration Law', 'Health Law', 'Banking and Finance Law', 'Entertainment Law', 'Cyber Law', 'Sports Law', 'Insurance Law', 'Maritime Law'],
    'Bachelor Of Engineering (BEng)': ['Computer Science', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Aerospace Engineering', 'Chemical Engineering', 'Biotechnology', 'Agricultural Engineering', 'Environmental Engineering', 'Industrial Engineering', 'Aeronautical Engineering', 'Mining Engineering', 'Metallurgical Engineering', 'Textile Engineering', 'Production Engineering', 'Marine Engineering', 'Petroleum Engineering', 'Polymer Engineering', 'Ceramic Engineering', 'Nuclear Engineering', 'Instrumentation Engineering', 'Mechatronics Engineering', 'Robotics Engineering'],
    'Bachelor Of Education (BEd)': ['Elementary Education', 'Secondary Education', 'Special Education', 'Early Childhood Education', 'Physical Education', 'English Education', 'Mathematics Education', 'Science Education', 'Social Studies Education', 'Language Education (e.g., Teaching English as a Second Language - TESL)', 'Art Education', 'Music Education', 'Technology Education', 'Computer Science Education', 'Physical Sciences Education', 'Biology Education', 'Chemistry Education', 'Physics Education', 'History Education', 'Geography Education', 'Health Education', 'Counseling and Guidance', 'Curriculum and Instruction', 'Educational Leadership', 'Literacy Education'],
    'Bachelor Of Medicine, Bachelor Of Surgery (MBBS)': [],
    'Bachelor Of Veterinary Science (BVSc)': ['Small Animal Veterinary Medicine', 'Large Animal Veterinary Medicine', 'Equine Veterinary Medicine', 'Exotic Animal Medicine', 'Wildlife Veterinary Medicine', 'Zoo Animal Medicine', 'Veterinary Surgery', 'Veterinary Internal Medicine', 'Veterinary Pathology', 'Veterinary Radiology', 'Veterinary Anesthesiology', 'Veterinary Dermatology', 'Veterinary Ophthalmology', 'Veterinary Neurology', 'Veterinary Oncology', 'Veterinary Cardiology', 'Veterinary Dentistry', 'Veterinary Nutrition', 'Veterinary Reproduction', 'Veterinary Public Health', 'Veterinary Epidemiology', 'Veterinary Parasitology', 'Veterinary Microbiology', 'Veterinary Virology', 'Veterinary Pharmacology', 'Veterinary Toxicology', 'Veterinary Behavior', 'Veterinary Practice Management'],
    'Bachelor Of Architecture (BArch)': ['Architectural Design', 'Building Technology', 'Architectural History and Theory', 'Urban Design', 'Landscape Architecture', 'Sustainable Architecture', 'Interior Design', 'Construction Management', 'Structural Engineering', 'Environmental Design', 'Heritage Conservation', 'Parametric Architecture', 'Digital Architecture', 'Housing and Community Planning', 'Transportation Planning', 'Urban Planning', 'Architectural Visualization', 'Building Information Modeling (BIM)', 'Architectural Acoustics', 'Lighting Design', 'Materials and Technology', 'Real Estate Development', 'Architectural Education'],
    'Bachelor Of Commerce (Bcom)': ['Commerce', 'Accounting', 'Finance', 'Economics'],
    
    'M.Tech': ['Computer Science', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Aerospace Engineering', 'Chemical Engineering', 'Biotechnology', 'Agricultural Engineering', 'Environmental Engineering', 'Industrial Engineering', 'Aeronautical Engineering', 'Mining Engineering', 'Metallurgical Engineering', 'Textile Engineering', 'Production Engineering', 'Marine Engineering', 'Petroleum Engineering', 'Polymer Engineering', 'Ceramic Engineering', 'Nuclear Engineering', 'Instrumentation Engineering', 'Mechatronics Engineering', 'Robotics Engineering', 'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Cybersecurity', 'Wireless Communication', 'VLSI Design', 'Embedded Systems', 'Control Systems', 'Power Systems', 'Renewable Energy', 'Structural Engineering', 'Transportation Engineering', 'Water Resources Engineering', 'Geotechnical Engineering', 'Environmental Engineering', 'Chemical Process Engineering', 'Biomedical Engineering', 'Food Technology', 'Nano Technology', 'CAD/CAM', 'RF and Microwave Engineering', 'Signal Processing', 'Image Processing', 'Communications Engineering', 'Photonics', 'Remote Sensing', 'Space Technology', 'Internet of Things (IoT)', 'Big Data Analytics', 'Cloud Computing', 'Blockchain Technology'],
    'M.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Environmental Science', 'Geology', 'Geography', 'Astronomy', 'Biochemistry', 'Biotechnology', 'Microbiology', 'Botany', 'Zoology', 'Ecology', 'Genetics', 'Molecular Biology', 'Neuroscience', 'Psychology', 'Computer Science', 'Information Technology', 'Data Science', 'Artificial Intelligence', 'Software Engineering', 'Electronics', 'Electrical Engineering', 'Telecommunication', 'Networking', 'Cybersecurity', 'Robotics', 'Control Systems', 'Biomedical Engineering', 'Nanotechnology', 'Materials Science', 'Chemical Engineering', 'Food Science', 'Nutrition', 'Applied Mathematics', 'Statistics', 'Operations Research', 'Financial Mathematics', 'Actuarial Science', 'Environmental Management', 'Sustainable Development', 'Climate Change', 'Wildlife Biology', 'Forestry', 'Oceanography', 'Marine Biology', 'Meteorology', 'Agriculture', 'Horticulture', 'Plant Pathology', 'Entomology', 'Soil Science', 'Environmental Chemistry', 'Analytical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Theoretical Chemistry', 'Developmental Biology', 'Cell Biology', 'Immunology', 'Biophysics', 'Computational Biology', 'Cognitive Science', 'Human Anatomy', 'Neuropsychology', 'Data Analytics', 'Machine Learning', 'Big Data', 'Cloud Computing', 'Information Security', 'Human-Computer Interaction', 'Web Development', 'Digital Forensics', 'Remote Sensing', 'Geographical Information Systems (GIS)', 'Medical Physics', 'Nuclear Physics', 'Condensed Matter Physics', 'Astrophysics', 'Quantum Mechanics', 'Financial Economics', 'Industrial Economics', 'Health Economics', 'International Economics', 'Econometrics', 'Development Economics', 'Political Science', 'International Relations', 'Public Policy', 'Sociology', 'Anthropology', 'Criminology', 'Counseling Psychology', 'Clinical Psychology', 'Social Work', 'Health Psychology', 'Educational Psychology', 'Sport and Exercise Psychology', 'Environmental Psychology', 'Media Studies', 'Journalism', 'Mass Communication', 'Public Relations', 'Film Studies', 'English Literature', 'American Literature', 'World Literature', 'Linguistics', 'Applied Linguistics', 'TESOL (Teaching English to Speakers of Other Languages)', 'Translation Studies', 'History', 'Archaeology', 'Art History', 'Philosophy', 'Religious Studies', 'Theology', 'Social Geography', 'Urban Planning', 'Rural Development', 'Development Studies', 'Conflict Resolution', 'Human Rights', 'Gender Studies', 'Law', 'Library Science', 'Information Science', 'Fashion Design', 'Textile Design', 'Interior Design', 'Graphic Design', 'Animation', 'Fine Arts', 'Creative Writing', 'Music', 'Dance', 'Theater', 'Film Production', 'Physical Education', 'Exercise Science', 'Sports Management', 'Recreation Management', 'Environmental Education', 'Science Education', 'Mathematics Education', 'Physics Education', 'Chemistry Education', 'Biology Education'],
    'M.A': ['English', 'History', 'Economics', 'Political Science', 'Sociology'],
    'M.Com': ['Accounting', 'Finance', 'Economics', 'Marketing', 'Management', 'Business Analytics', 'Financial Management', 'International Business', 'Entrepreneurship', 'Human Resource Management', 'Supply Chain Management', 'Operations Management', 'Corporate Governance', 'Risk Management', 'Taxation', 'Banking', 'Insurance', 'Investment Management', 'Strategic Management', 'Retail Management', 'E-commerce', 'Digital Marketing', 'Business Law', 'Financial Accounting', 'Cost Accounting', 'Management Accounting', 'Auditing', 'Microeconomics', 'Macroeconomics', 'Applied Statistics', 'Business Ethics', 'Financial Reporting', 'Mergers and Acquisitions', 'Project Management', 'Organizational Behavior', 'Leadership and Motivation', 'Business Communication', 'Market Research', 'Corporate Finance', 'Derivatives and Risk Management', 'Capital Markets', 'Consumer Behavior', 'Supply Chain Analytics', 'Corporate Accounting', 'International Finance', 'Financial Modelling', 'Public Finance', 'Sustainability in Business'],
    
    'Ph.D': ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics Engineering', 'Chemical Engineering', 'Biotechnology', 'Aerospace Engineering', 'Environmental Engineering', 'Industrial Engineering', 'Agricultural Engineering', 'Materials Science', 'Nanotechnology', 'Robotics', 'Artificial Intelligence', 'Data Science', 'Machine Learning', 'Cybersecurity', 'Network Security', 'Wireless Communication', 'VLSI Design', 'Control Systems', 'Power Systems', 'Renewable Energy', 'Structural Engineering', 'Transportation Engineering', 'Geotechnical Engineering', 'Water Resources Engineering', 'Social Sciences', 'Economics', 'Psychology', 'Sociology', 'Political Science', 'International Relations', 'Public Policy', 'Education', 'Linguistics', 'Anthropology', 'Archaeology', 'History', 'Literature', 'Philosophy', 'Religious Studies', 'Cultural Studies', 'Environmental Science', 'Geography', 'Geology', 'Astronomy', 'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Statistics', 'Applied Mathematics', 'Operations Research', 'Financial Mathematics', 'Health Sciences', 'Biomedical Sciences', 'Pharmacology', 'Genetics', 'Neuroscience', 'Immunology', 'Medical Physics', 'Public Health', 'Nursing', 'Medical Informatics', 'Business Administration', 'Management', 'Finance', 'Marketing', 'Organizational Behavior', 'Strategic Management', 'Entrepreneurship', 'Human Resource Management', 'Operations Management', 'Information Systems', 'Supply Chain Management', 'Accounting', 'Business Analytics', 'Tourism Management', 'Hospitality Management', 'Communication', 'Media Studies', 'Mass Communication', 'Journalism', 'Visual Communication', 'Film Studies', 'Fine Arts', 'Performing Arts', 'Music', 'Dance', 'Theater', 'Architecture', 'Urban Planning', 'Rural Development', 'Environmental Management', 'Sustainable Development', 'Climate Change', 'Law', 'Criminal Justice', 'Public Administration', 'Social Work', 'Social Welfare', 'Library Science', 'Information Science', 'Health Administration', 'Health Policy', 'Bioinformatics', 'Biostatistics', 'Health Education', 'Health Promotion', 'Health Services Research', 'Epidemiology', 'Nutrition', 'Food Science', 'Veterinary Sciences', 'Environmental Policy', 'Wildlife Biology', 'Forestry', 'Oceanography', 'Marine Biology', 'Meteorology', 'Agricultural Sciences', 'Horticulture', 'Entomology', 'Plant Pathology', 'Soil Science', 'Crop Science', 'Animal Sciences', 'Fisheries', 'Aquaculture', 'Anthropology', 'Development Studies', 'Conflict Resolution', 'Gender Studies', 'Human Rights', 'International Development', 'Educational Leadership', 'Curriculum and Instruction', 'Higher Education', 'Education Policy', 'Educational Psychology', 'Special Education', 'Instructional Design', 'Teaching and Learning', 'Counselor Education', 'Adult Education', 'TESOL (Teaching English to Speakers of Other Languages)', 'Library and Information Science', 'Instructional Technology', 'Global Health', 'Biomedical Engineering', 'Biomechanics', 'Bioengineering', 'Medical Engineering', 'Chemical Biology', 'Physical Chemistry', 'Quantum Mechanics', 'Theoretical Physics', 'Astrophysics', 'Cosmology', 'Electromagnetics', 'Nanomaterials', 'Condensed Matter Physics', 'Computational Biology', 'Neurobiology', 'Cognitive Science', 'Developmental Psychology', 'Counseling Psychology', 'Clinical Psychology', 'Social Psychology', 'Organizational Psychology', 'Health Psychology', 'Quantitative Psychology', 'Educational Psychology', 'Sport Psychology', 'Environmental Psychology', 'Archaeology', 'Cultural Heritage Management', 'Conservation Biology', 'Wildlife Conservation', 'Environmental Conservation', 'Sustainability Studies'],
  
  };
  const navigate = useNavigate();



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
  
  

  const handlePreferenceChange = (e) => {
    setPreference(e.target.value);
  };
  const [preference, setPreference] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const handleResumeFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setResumeFile(selectedFile);
  };

  const handleSubmit = async () => {
    navigate('/feed')
    const formData = new FormData();
    formData.append('resume', resumeFile);

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
  };

  const fileData = resumeFile ? new Blob([resumeFile], { type: resumeFile.type }) : null;
  const fileName = resumeFile ? resumeFile.name : '';
  const fileURL = fileData ? URL.createObjectURL(fileData) : '';
  
  // Create a link and click it to initiate the download
  if (fileData) {
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  

  return (
    <div className="info-entry">
      <h1 className="heading">Create your Profile</h1>
      
      <h2 className="heading">Resume</h2>
      <label>Upload your Resume:</label>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeFileChange} />


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

      <h2 className="heading">Set your Preferences!</h2>
      <div className="preference-section">
        <label>Preference:</label>
        
        <select value={preference} onChange={handlePreferenceChange}>
          <option value="">Select</option>
          <option value="Internship">Internship</option>
          <option value="Training">Training</option>
          <option value="Job">Job</option>
          <option value="Career Change">Career Change</option>
        </select>
      </div>

      <div className="submit-section">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    

  );
};

export default InfoEntry;
