module.exports = function(sockets, socket, name, whisper) {
  let found = false

  sockets.forEach(i => {
    if (i.id === name) {
      i.write(`${socket.id} (whispered): ${whisper}`)
      found = true
    }
  })

  if (!found) socket.write('That user doesnt exist\n')
}
