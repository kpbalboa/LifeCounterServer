const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    
  }
});




// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

io.on('connection',  (socket) => {
  console.log('a user connected');
  socket.emit("hello", "world");
  // socket.on('disconnect', () => {
  //   console.log('user disconnected');
  // });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });


});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
