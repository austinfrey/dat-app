const http = require('http')
const hyperdrive = require('hyperdrive')
const WebSocket = require('websocket-stream')

const archive = hyperdrive('drive')
archive.ready(() => {
	console.log(archive.key.toString('hex'))
  archive.writeFile('hello', 'world', (err) => console.log(err || 'done'))
})

const server = http.createServer()

const wss = WebSocket.createServer({ server }, handler)

server.listen(3000)

function handler (stream) {
	stream.pipe(archive.replicate()).pipe(stream)
}

