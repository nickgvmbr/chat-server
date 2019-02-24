module.exports = function(sockets, socket, msg) {
  sockets.forEach(i => {
    if (i.id !== socket.id) i.write(msg)
  })
}
