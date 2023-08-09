'use strict';
const _          = require('underscore'),
      processing = require('./libs/processing'),
      parser     = require('./libs/parser');

/**
 *
 * @constructor
 */
function rias() {

}
rias.prototype.parseFile = function (PreparedFile, cbGetResume) {
  console.log('Parsing file: "' + PreparedFile.name + '"');
  parser.parse(PreparedFile, cbGetResume);
};


rias.prototype.storeResume = function (PreparedFile, Resume, path, cbOnSaved) {
  PreparedFile.addResume(Resume);

  if (!_.isFunction(cbOnSaved)) {
    return console.error('cbOnSaved should be a function');
  }
  PreparedFile.saveResume(path, cbOnSaved);
};


module.exports = rias;
