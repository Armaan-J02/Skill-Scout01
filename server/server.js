const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { parseResume } = require('../models/resume_parser/'); // Import the resume parser code
const MongoClient = require('mongodb').MongoClient;


const app = express();

// Enable CORS
app.use(cors());

// MongoDB configuration
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'resumeDB'; // Replace with your desired database name

// Connect to MongoDB
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB successfully!');
});


// Configure storage using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../storage/inputresume')); // Save the file to 'ats/storage/resume' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Handle the file upload and resume parsing
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    // Parse the uploaded resume
    const parsedData = await parseResume(req.file.path);

    // Save the parsed data to the database
    const db = client.db(dbName);
    const collection = db.collection('resumes');
    await collection.insertOne(parsedData);

    // Respond with the parsed data
    res.json(parsedData);
  } catch (error) {
    console.error('Error parsing or saving resume:', error);
    res.status(500).json({ error: 'An error occurred while processing the resume.' });
  }
});

// Default route to handle root URL
app.get('/', (req, res) => {
  res.send('Server is running. Use POST request to /upload for file upload.');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
