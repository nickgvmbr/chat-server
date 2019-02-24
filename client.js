const net = require('net')

const client = net.createConnection(8080, () => {
  console.log('Connected to 8080...')
})

client.pipe(process.stdout)
process.stdin.pipe(client)
