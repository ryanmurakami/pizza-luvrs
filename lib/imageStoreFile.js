'use strict';

const fs = require('fs');

module.exports.save = (name, data, callback) => {
  let fileName = '/assets/pizzas/' + name + '.png';

  fs.writeFile(__dirname + '/..' + fileName, data, 'base64', (err) => {
    callback(err, fileName);
  });
};
