'use strict';

const fs = require('fs');

function saveImage (name, base64String, callback) {
  let fileName = '/assets/pizzas/' + name + '.png',
    imageData = base64String.split('data:image/png;base64,')[1];

  fs.writeFile(__dirname + '/..' + fileName, imageData, 'base64', (err) => {
    callback(err, fileName);
  });
}

module.exports.saveImage = saveImage;
