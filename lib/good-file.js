const fs = require('fs-extra')

const internals = {
  defaults: {
    encoding: 'utf8',
    flags: 'a',
    mode: 0o666
  }
}

class GoodFile extends fs.WriteStream {
  constructor (path, options) {
    const settings = Object.assign({}, internals.defaults, options)
    settings.fd = 1 // prevent open from being called in `super`

    super(path, settings)
    this.open()
  }
  open () {
    this.fd = null
    fs.ensureFile(this.path, (err) => {
      if (err) {
        this.destroy()
        this.emit('error', err)
        return
      }
      super.open()
    })
  }
}

module.exports = GoodFile
