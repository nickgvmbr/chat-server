const net = require('net'),
      msg = require('./utils/message'),
      log = require('./utils/log'),
      username = require('./utils/username'),
      whisper = require('./utils/whisper'),
      kick = require('./utils/kick')

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

    // msg or command

    socket.on('data', chunk => {
      chunk = chunk.toString().split(' ')

      switch (chunk[0]) {
        case '/username':
        case '/username\n':
          if (chunk[1]) {
            let name = chunk[1].substring(0, chunk[1].length - 1)
            username(sockets, socket, name)
          }
          else socket.write('You need to pass a username\n')
          break

        case '/whisper':
        case '/whisper\n':
        let message = chunk.slice(2).join(' ')
          if (chunk[1] && chunk[2])
            whisper(sockets, socket, chunk[1], message)
          else socket.write('You need to pass a username and a whisper\n')
          break

        case '/clientlist\n':
          sockets.forEach(i => {
            socket.write(`${i.alias || i.id}\n`)
          })
          break

        case '/kick':
        case '/kick\n':
          if (chunk[1] && chunk[2]) {
            let pw = chunk[2].substring(0, chunk[2].length - 1)
            kick(sockets, socket, chunk[1], pw)
          }
          else socket.write('You need to pass a username and a password\n')
          break

        default:
          msg(sockets, socket, `${socket.id}: ${chunk.join(' ')}`)
          log(`${socket.id}: ${chunk.join(' ')}`)
          break
      }

    })

    // leave

    socket.on('end', () => {
      sockets = sockets.filter(i => i.id !== socket.id)
      msg(sockets, socket, `${socket.id} has left\n`)
      log(`${socket.id} has left`)
    })

  })
