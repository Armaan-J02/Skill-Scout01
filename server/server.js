const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Configure storage using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../storage/resume')); // Save the file to 'ats/storage/resume' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Handle the file upload
app.post('/upload', upload.single('resume'), (req, res) => {
  // Respond with a success message
  res.json({ message: 'Resume uploaded successfully!' });
});

// Default route to handle root URL
app.get('/', (req, res) => {
  res.send('Server is running. Use POST request to /upload for file upload.');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
