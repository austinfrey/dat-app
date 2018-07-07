const WebWorkify = require('webworkify')
const WorkerStream = require('workerstream')

const fileOpsWorker = WebWorkify(require('../workers/fileOps'))
const fileStreamWorker = WebWorkify(require('../workers/fileStreams'))

module.exports = mainStore
function mainStore (state, emitter) {
	state.result = 'Waiting for input'
	
	state.fileOps$ = WorkerStream(fileOpsWorker)
	state.file$ = WorkerStream(fileStreamWorker)

	state.fileOps$.on('data', loadState)
	state.file$.on('data', data => console.log(Decodeuint8arr(data)))

	function Decodeuint8arr(uint8array){
		return new TextDecoder("utf-8").decode(uint8array)
	}

	function loadState (data) {
		state.result = data
		emitter.emit('render')
	}
}

