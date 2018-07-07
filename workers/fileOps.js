const hyperdrive = require('hyperdrive')
const rai = require('random-access-idb')
const drive = hyperdrive(rai('drive'))

module.exports = function (self) {
	self.addEventListener('message', function (ev) {
		const {
			command,
			name,
			buffer,
			options
		} = ev.data

		const cmds= {
			readdir,
			readFile,
			writeFile,
		}

		cmds[command]()

		function readdir () {
			drive.readdir(name, function (err, files) {
				if (err) console.error(err)
				self.postMessage(files)
			})
		}

		function readFile () {
			drive.readFile(name, options, function (err, data) {
				if (err) console.error(err)
				self.postMessage(JSON.parse(data))
			})
		}

		function writeFile () {
			drive.writeFile(name, buffer, options, function (err) {
				if (err) console.error(err)
				self.postMessage(true)
			})
		}
	})
}
