const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const jwt_sec = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567891234567890!@#$%^&*(),.<>?/;:[]{}|`~"

const accountSchema = require('./schemas/account'); 
const Resume = require('./schemas/resume');
// Import the exported connection string from atlas_uri.js
const atlasUri = require('../atlas_uri');
const { createReadStream } = require('fs');

const shap = express();
shap.use(bodyParser.json());
shap.use(express.json());
shap.use(cors())


mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Applicant', // Set the database name to "applicant"
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});


// Specify the collection name as 'accounts'
const Account = mongoose.model('accounts', accountSchema);

shap.post('/api/register', async (req, res) => {
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

module.exports = { 
  shap,
  };

shap.listen(3001, () => {
  console.log('Server is running on port 3001');
});