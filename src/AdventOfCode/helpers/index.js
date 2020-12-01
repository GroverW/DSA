const fs = require('fs');

export const readAndExecute = (file, callback) => {
  fs.readFile(file, 'utf8', (_, data) => {
    const parsed = data.split('\r\n');
    console.log(callback(parsed));
  });
};

export const DEFAULT_FILE = './input.txt';
