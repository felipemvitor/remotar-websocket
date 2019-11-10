const http = require('http')

require('dotenv').config()

const PORT = process.env.PORT || 3000

const handleRequest = (req, res) => {
    res.end('Home page')
}

const server = http.createServer(handleRequest)
const io = require('socket.io')(server)

io.on('connection', socket => {
    const type = socket.handshake.query.type
    const id = socket.client.id

    console.log(`Client '${type}' connected with id ${id}`)
    socket.emit('connection')

    socket.on('stream', data => {
        // console.log('Stream')
        socket.broadcast.emit('stream', data)
    })

})

server.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})