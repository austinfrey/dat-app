const websocket = require('websocket-stream')
const hyperdrive = require('hyperdrive')
const rai = require('random-access-idb')
const through = require('through2')
const pump = require('pump')

const key = '88760581506755667b5de85e852009877ae5a5bd6a9c7e62e881d072b71bb1b8'
const url = `ws://localhost:3000/${key}`
const drive = hyperdrive(rai('ws'), key)

module.exports = websocketStore 

function websocketStore (state, emitter) {
    state.drive = drive

    drive.once('ready', () => {
        const socket = websocket(url)
      
        socket.pipe(drive.replicate()).pipe(through(logger)).pipe(socket)

        function logger (chunk, encoding, next) {
            console.log(chunk)
            this.push(chunk)
            next()
        }
    })
}