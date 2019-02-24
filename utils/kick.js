const msg = require('./message'),
      log = require('./log')

const pw = 'password'

module.exports = function(sockets, socket, name, password) {
  if (password === pw) {

    if (name === socket.id) {
      socket.write('You can\'t kick yourself out\n')
      return
    }

    let found = false
  
    sockets.forEach(i => {
      if (i.id === name) {
        found = true
        i.write('You\'ve been removed\n')
        i.destroy()
      }
    })

    if (found) {
      sockets = sockets.filter(i => i.id !== name)
      msg(sockets, socket, `${name} has been removed\n`)
      socket.write(`${name} has been removed\n`)
      log(`${name} has been removed`)
    }

    else socket.write('That user doesn\'t exist\n')
  }

  else socket.write('Incorrect password\n')
}
