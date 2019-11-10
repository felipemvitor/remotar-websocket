const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', socket => {
    const type = socket.handshake.query.type
    const id = socket.client.id

    console.log(`Client '${type}' connected with id ${id}`)
    socket.emit('connection')

    socket.on('stream', data => {
        console.log('Stream')
        socket.broadcast.emit('stream', data)
    })

})

server.listen(9200, ()=> {
    console.log('Server listen to port 9200')
})