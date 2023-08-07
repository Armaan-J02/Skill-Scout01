const express = require('express'),
      router  = express.Router(),
      parseIt = require('../utils/parseIt'),
      multer  = require('multer'),
      crypto  = require('crypto'),
      mime    = require('mime'),
      upload  = multer({
        storage: multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, './uploads/')
          },
          filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
              cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
            });
          }
        })
      });



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});


router.post('/', upload.single('upl'), function (req, res, next) {
  console.log("success");
  console.log(req.file.path);
  parseIt.parseResume(req.file.path, './compiled');
  res.status(204).end();
});


module.exports = router;
