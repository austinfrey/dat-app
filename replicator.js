const hyperdrive = require('hyperdrive')
const through = require('through2')

const key = '35f4a7db38f758404469a7c2b2011e8185cf12e920de5f0b6959096c7c0ef46e'
const url = `ws://localhost:3000`

const archive = hyperdrive(`db-${key}`, key)

const websocket = require('websocket-stream')
const socket = websocket(url)

socket.pipe(through(logger)).pipe(archive.replicate()).pipe(socket)

archive.readdir('/', (err, files) => console.log(err || files))

function logger (chunk, enc, next) {
	console.log(chunk)
	this.push(chunk)
	next()
}
