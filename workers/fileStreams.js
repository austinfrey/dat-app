const hyperdrive = require('hyperdrive')
const rai = require('random-access-idb')

const drive = hyperdrive(rai('drive'))
const ParentStream = require('workerstream/parent')

module.exports = function (self) {
    self.addEventListener('message', function (ev) {
        const {
            command,
            name,
            options
        } = ev.data

        const cmds = {
            createReadStream
        }

        cmds[command]()

        function createReadStream () {
            const p$ = ParentStream()
            const stream = drive.createReadStream(name, options)

            stream.pipe(p$)
        }
    })
}