const http = require('http')

require('dotenv').config()

const PORT = process.env.PORT || 4500

const handleRequest = (req, res) => {
    res.end('Home page')
}

const server = http.createServer(handleRequest)
const io = require('socket.io')(server)

io.on('connect', socket => {
    const type = socket.handshake.query.type
    const id = socket.client.id

    console.log(`Client '${type}' connected with id ${id}`)
    socket.emit('connection')

    socket.on('stream', data => {
        // console.log('Stream')
        socket.broadcast.emit('stream', data)
    })

    socket.on('JSONDATA', (data) => {
        var dataBridge = data.dataBridge

        var dashboard = dataBridge.map((d) => {
            return { name: d.Text, value: d.Value }
        })

        socket.broadcast.emit('data', dashboard)
    })

    socket.on('OnReceiveData', data => {
        var dataByte = data.DataByte
        socket.broadcast.emit('stream', dataByte)
    })


    socket.on('plot', data => {
        console.log(`Coordinates received: ${data.x}, ${data.y}`)
        socket.broadcast.emit('plot', data)
    })
})

server.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})