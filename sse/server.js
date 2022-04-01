import express from "express";

const server = express()

server.get('/sse', (req, res) => {
    res.header('Cache-Control', 'no-cache');
    res.header('Content-Type', 'text/event-stream');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Connection', 'keep-alive');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.flushHeaders()
    for (let index = 1; index < 10; index++) {
        res.write('data: sse test\n\n')
        setTimeout(() => { }, 1000)
    }
    res.end()
    res.on('close', () => {
        console.log('connection closed')
        res.end()
    })
})

server.listen(3000)