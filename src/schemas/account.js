const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  });

module.exports = accountSchema;