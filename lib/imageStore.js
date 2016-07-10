'use strict';

const fileStore = require('./imageStoreFile');

function saveImage (name, base64String, callback) {
  let imageData = base64String.split('data:image/png;base64,')[1];
  fileStore.save(name, imageData, callback);
}

module.exports.saveImage = saveImage;
