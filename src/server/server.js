const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { parse } = require('./src/libs/parser');
const { run: processFile } = require('./src/libs/processing');
const { Resume } = require('./src/Resume'); 
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
    cb(null, path.join(__dirname, './uploads')); // Save the file to 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Handle the file upload and resume parsing
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    // Process the uploaded resume and parse it
    processFile(req.file.path, async (PreparedFile) => {
      const ResumeInstance = new Resume();
      parse(PreparedFile, (parsedResume) => {
        // Save the parsed resume data to the database
        const db = client.db(dbName);
        const collection = db.collection('resumes');
        collection.insertOne(parsedResume.parts);

        // Respond with the parsed data
        res.json(parsedResume.parts);
      });
    });
  } catch (error) {
    console.error('Error processing or saving resume:', error);
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
