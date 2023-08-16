const os = require('os'); // Import the 'os' module

function generateParsedFilename(originalFilename) {
  const [filenameWithoutExtension] = os.path.splitext(originalFilename);
  const parsedFilename = `${filenameWithoutExtension}.json`;
  return parsedFilename;
}

module.exports = { generateParsedFilename };
