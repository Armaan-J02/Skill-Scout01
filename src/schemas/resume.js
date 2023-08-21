const mongoose = require('mongoose');

// Define the schema for the "resumes" collection
const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  linkedin: String,
  github: String,
  objective: String,
  summary: String,
  technology: String,
  skills: String,
  experience: String,
  education: String,
  languages: String,
  courses: String,
  projects: String,
  links: String,
  contacts: String,
  positions: String,
  profiles: String,
  awards: String,
  honors: String,
  additional: String,
  certification: String,
  interests: String,
});

module.exports = resumeSchema;
