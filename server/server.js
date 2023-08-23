const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const execa = require('execa');
const fs = require('fs'); // Import the fs module
const app = express();
const authRoutes = require('../src/authRoutes');


app.use (authRoutes.shap);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../storage/inputresume'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('resume'), async (req, res) => {
  const uploadedFileName = req.file.originalname;
  const parsedFileName = uploadedFileName.replace(/\.[^.]+$/, ''); // Remove file extension

  try {
    const pythonScriptPath = 'src/models/parser-resume/ractor.py';
    await execa('python', [pythonScriptPath, uploadedFileName]);

    console.log('Python script executed successfully!');

    console.log('Resume parsed successfully!');
  } catch (error) {
    console.error('Error executing Python script:', error);
    res.status(500).json({ error: 'An error occurred while parsing the resume.' });
  }
});




//  app.get('/extracted-info/:filename', (req, res) => {
//   const parsedFileName = req.params.filename.replace(/\.[^.]+$/, ''); // Remove file extension
//   const jsonFilePath = path.join(__dirname, '../storage/output', `${parsedFileName}.json`);

//   if (fs.existsSync(jsonFilePath)) {
//     const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
//     const resumeData = JSON.parse(jsonData);
//     console.log(jsonFilePath)
//     const extractedInfo = {
//       email: resumeData.email,
//       phone: resumeData.phone,
//       linkedin: resumeData.linkedin,
//       github: resumeData.github,
//     };

//     res.json(extractedInfo);
//   } else {
//     res.status(404).json({ error: 'Extracted JSON file not found.' });
//   }
// });

app.get('/', (req, res) => {
  res.send('Server is running. Use POST request to /upload for file upload.');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});