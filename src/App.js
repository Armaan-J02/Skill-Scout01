import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/home.js";
import ResumeParserApp from './path/to/ResumeParserApp'; // Import ResumeParserApp component

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Define other routes for your application */}
        </Routes>
      </Router>

      {/* Include the ResumeParserApp component */}
      <ResumeParserApp />
    </div>
  );
}

export default App;
