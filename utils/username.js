const msg = require('./message'),
      log = require('./log')

module.exports = function(sockets, socket, name) {
  let avaliable = true

  sockets.forEach(i => {
    if (i.id === name) {
      socket.write('That name already in use\n')
      avaliable = false
    }
  })

  if (avaliable) {
    socket.write(`You are now '${name}'\n`)
    msg(sockets, socket, `${socket.id} is now '${name}'\n`)
    log(`${socket.id} is now ${name}`)
    socket.id = name
  }
}
