const choo = require('choo')

const app = choo()

process.env.NODE_ENV === 'production'
	? app.use(require('choo-service-worker')())
	: app.use(require('choo-service-worker/clear')())

app.use(require('choo-devtools')())
app.use(require('./websockets/websockets'))

app.route('/', require('./views/main'))

app.mount('body')

