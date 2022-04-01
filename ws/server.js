import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 })

let sockets = []

wss.on('connection', (socket, req) => {
    console.log('client connected on ' + socket.url)
    sockets.push(socket)

    socket.on('message', function(data) {
        console.log('received message on ' + socket.url + '\n' + 'data: ' + data)
    })

    socket.on('close', function() {
        sockets.filter((sock) => sock !== socket)
    })

    socket.on('error', function(err) {
        console.log('error occured on ' + socket.url + '\n' + 'message: ' + err.message)
    })
})

wss.on('listening', () => {
    console.log('started ws server on ' + wss.path)
})

wss.on('error', (err) => {
    console.log('server error:\n' + err.message)
})