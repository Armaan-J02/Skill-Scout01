const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  // Replace this response with your own logic
  res.send('Custom response for users route');
});

module.exports = router;
