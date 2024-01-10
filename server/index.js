const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require('socket.io')


//create socket server
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",

    }
})

//socket connection
io.on("connection", (socket)=>{
    console.log(`user ${socket.id} connected`)

    socket.on('loginAttempt', Data=>{
        console.log(Data)
    });



    socket.on('disconnect', ()=>{
        console.log(`user ${socket.id} disconnected`)
    });
})

server.listen(3001, ()=>{
    console.log('server running')
});