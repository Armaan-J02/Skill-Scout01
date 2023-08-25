const path = require('path');
const fs = require('fs');

function generateParsedFilename(uploadedFileName) {
  const parsedFileName = uploadedFileName.replace(/\.[^.]+$/, '');
  const jsonFilePath = path.join(__dirname, '../storage/output', `${parsedFileName}.json`);
  const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
  const resumeData = JSON.parse(jsonData);
  return jsonData; // Return the parsed resume data
}

module.exports = { generateParsedFilename };
