const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const execa = require('execa'); // Import execa module

const app = express();

// Enable CORS
app.use(cors());

// Configure storage using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../storage/inputresume'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Handle the file upload.
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const uploadedFileName = req.file.originalname;
    const pythonScriptPath = 'src/models/parser-resume/ractor.py';
    
    // Execute Python script
    const { stdout, stderr } = await execa('python', [pythonScriptPath, uploadedFileName]);

    // Respond with a success message and the Python script's output
    res.json({
      message: 'Resume uploaded and parsed successfully!',
      filename: uploadedFileName,
      pythonOutput: stdout,
    });

    console.log('Python script executed successfully:', stdout);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred.' });
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
