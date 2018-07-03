const choo = require('choo')
const h = require('hyperscript')

const app = choo()

app.use(require('choo-devtools')())
app.use(require('./stores/main'))
app.route('/', mainView)

app.mount('body')

function mainView (state, emit) {
	return h('body', 'hello')
}
