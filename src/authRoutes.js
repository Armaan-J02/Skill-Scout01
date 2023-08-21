const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const accountSchema = require('./schemas/account'); 

// Import the exported connection string from atlas_uri.js
const atlasUri = require('../atlas_uri');

const app = express();
app.use(bodyParser.json());

app.use(cors())
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



// Specify the collection name as 'accounts'
const Account = mongoose.model('accounts', accountSchema);

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const newAccount = await Account.create({ email, password });
    res.status(201).json({
      status: 'success',
      message: 'Account created successfully',
      newAccount,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
