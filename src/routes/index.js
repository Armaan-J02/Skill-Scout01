const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    },
  }),
});

const parseIt = require('../utils/parseIt'); 

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.single('upl'), function (req, res, next) {
  console.log('File upload success');
  console.log(req.file.path);

  // Modify this line to fit your project's requirements
  // Call the parsing function from your project using req.file.path
  // parseIt.parseResume(req.file.path, './compiled');

  res.status(204).end();
});

module.exports = router;
