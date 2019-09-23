const fileStore = require('./imageStoreFile')

function save (name, base64String) {
  const imageData = base64String.split('data:image/png;base64,')[1]
  return fileStore.save(name, imageData)
}

module.exports = {
  save
}
