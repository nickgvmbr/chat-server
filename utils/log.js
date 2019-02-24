const fs = require('fs'),
      path = require('path')

const file = fs.createWriteStream(path.join(__dirname, '..', 'chat.log'))

module.exports = function(msg) {
  file.write(msg + '\n')
}
