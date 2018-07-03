const WebWorkify = require('webworkify')
const WorkerStream = require('workerstream')
const worker = WebWorkify(require('../workers/worker'))

module.exports = function (state, emit) {
	state.w$ = WorkerStream(worker)
	state.w$.write(4)
	state.w$.end()
	state.w$.on('data', console.log)
}

