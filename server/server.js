const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const execa = require('execa');
const fs = require('fs'); // Import the fs module
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const accountSchema = require('../src/schemas/account');
const Resume =  require('../src/schemas/resume');
const atlasUri = require('./../atlas_uri')
const { createReadStream } = require('fs');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

// const jwt_sec = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567891234567890!@#$%^&*(),.<>?/;:[]{}|`~"
// const jwtExpiresIn = '1h';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Applicant', // Set the database name to "Applicant"
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const Account = mongoose.model('accounts', accountSchema);


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

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newAccount = await Account.create({ email, password});
    const createdAccountId = newAccount._id;
    console.log(createdAccountId)

    res.status(201).json({
      status: 'success',
      message: 'Account created successfully',
      accountId: createdAccountId,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email });

    if (!account || account.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    //const token = jwt.sign({ accountId: account._id }, jwtsec, { expiresIn: jwtExpiresIn });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      //token: token,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});