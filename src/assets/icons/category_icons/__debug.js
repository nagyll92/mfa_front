const fs = require('fs');
const path = require('path');

const currentDir = path.resolve('.');

const fileList = fs.readdirSync(currentDir);

const outputArray = [];

for (const file of fileList) {
  const [name, ext] = file.split('.');
  if (ext === 'svg') {
    outputArray.push(name);
  }
}

fs.writeFileSync(currentDir + '/__output.json', JSON.stringify(outputArray));
console.log('here', outputArray);
