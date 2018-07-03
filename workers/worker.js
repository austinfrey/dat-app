const hyperdrive = require('hyperdrive')

module.exports = function (self) {
	self.addEventListener('message', function (ev) {
		console.log('WORKER', ev.data)
		self.postMessage('whatup')
	})
}
