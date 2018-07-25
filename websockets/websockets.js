const websocket = require('websocket-stream')
const hyperdrive = require('hyperdrive')
//const hyperdrive = require('@jimpick/hyperdrive-hyperdb-backend')
const rai = require('random-access-idb')
const through = require('through2')
const pump = require('pump')

const key = '35f4a7db38f758404469a7c2b2011e8185cf12e920de5f0b6959096c7c0ef46e'
const url = `ws://localhost:3000`
const archive = hyperdrive(rai('ws'), key)

module.exports = websocketStore

function websocketStore (state, emitter) {
    state.archive = archive
    archive.ready(() => {
        const socket = websocket(url)

        connectSocket()

        function connectSocket() {
            pump(
                socket,
                archive.replicate({ live: true }),
                through(logger),
                socket,
                done
            )
        }

        function done (err) {
            if (err) {
							setTimeout(connectSocket, 5000)
							console.log(err)
						}
            console.log('RESTARTED')
        }

        function logger (chunk, encoding, next) {
            console.log(chunk)
            this.push(chunk)
            next()
        }
    })
}
