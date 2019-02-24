const net = require('net'),
      msg = require('./utils/message'),
      log = require('./utils/log')

let count = 0
let sockets = []

const server = net.createServer()
  .listen(8080, () => {
    console.log('Listening on 8080...')
  })

  .on('connection', socket => {
    socket.id = `Client${count}`
    count++
    sockets.push(socket)

    process.stdin.pipe(socket)

    // join

    socket.write(`Welcome ${socket.id}\n`)
    msg(sockets, socket, `${socket.id} has joined\n`)
    log(`${socket.id} has joined`)

    // msg

    socket.on('data', chunk => {
      msg(sockets, socket, `${socket.id}: ${chunk}`)
      log(`${socket.id}: ${chunk}`)
    })

    // leave

    socket.on('end', () => {
      sockets = sockets.filter(i => i.id !== socket.id)
      msg(sockets, socket, `${socket.id} has left\n`)
      log(`${socket.id} has left`)
    })

  })
