// Import necessary modules and libraries
var ParseBoy = require('../models/resume_parser/ParseBoy');
var processing = require('../models/resume_parser/libs/processing'); 
var logger = require('tracer').colorConsole();

// Define the parser object
var parser = {
  parseResume: function (file, savePath) {
    var objParseBoy = new ParseBoy();

    var onFileReady = function (preppedFile) {
      objParseBoy.parseFile(preppedFile, function (Resume) {
        logger.trace('Parsing completed for ' + preppedFile.name + ', now saving...');

        objParseBoy.storeResume(preppedFile, Resume, savePath, function (err) {
          if (err) {
            return logger.error('Error saving resume ' + preppedFile.name, err);
          }
          logger.trace('Resume ' + preppedFile.name + ' saved');
        });
      });
    };

    processing.run(file, onFileReady);
  }
};

// Export the parser module
module.exports = parser;
