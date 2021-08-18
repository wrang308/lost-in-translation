const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middleware = jsonServer.defaults({ noCors: true })

const { PORT = 3000 } = process.env

server.use(middleware)
server.use(router)

server.listen( PORT, () => {
	console.log(`JSON Server running on port ${ PORT }`)
})