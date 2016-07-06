'use strict';

module.exports = (dir) => {
  const retObj = {};

  let files = require('fs').readdirSync(dir);

  for (let val of files) {
    let filename = val.split('.js')[0];
    retObj[filename] = require(dir + filename);
  }

  return retObj;
};
