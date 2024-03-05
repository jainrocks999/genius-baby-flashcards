const fs = require('fs');
const path = require('path');

const folderPath = 'files';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  const nonMp3Files = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.png';
  });

  const fileNamesArray = JSON.stringify(nonMp3Files, null, 2);

  fs.writeFile(
    'fileNames.js',
    `const fileNames = ${fileNamesArray};\n\nmodule.exports = fileNames;`,
    writeErr => {
      if (writeErr) {
        console.error('Error writing JavaScript file:', writeErr);
      } else {
        console.log(
          'File names (excluding .mp3 files) exported to fileNames.js',
        );
      }
    },
  );
});
