const { Socket } = require('dgram');
const { create } = require('domain');
const express = require('express');
const app = express();
const http = require('http');
const { createBrotliCompress } = require('zlib');
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
   
  }
});

let users = [];
let roomNumber= 0

io.on('connection',  (socket) => {

//   socket.on("join server", (username) =>{
// const user = {
//   username,
//   id:socket.id,
// }
// user.push(user);
// io.emit("New user", user)
//   })

  socket.on("join room", (roomNumber)=>{
    console.log(roomNumber.CImage)
    socket.join(roomNumber.roomNumber.roomNum);
    io.to(roomNumber.roomNumber.roomNum).emit("join room", roomNumber.roomNumber, roomNumber.commander, roomNumber.CImage)
  })

  socket.on('NewRoom', () => {
    roomNumber++;
    socket.join(roomNumber);
    socket.emit("NewRoom", roomNumber)
  });



  

  socket.on('get data', (data) => {
    io.to(data.roomNumber).emit('get data', data)
    // console.log('message: ' + data.roomNumber);
  });

  socket.on('changeLife', (data) => {
    io.to(data.roomNumber).emit('changeLife', data)
    console.log('message: ' + data.roomNumber);
  });
  socket.on('changePoison', (data) => {
    io.to(data.roomNumber).emit('changePoison', data)
    console.log('message: ' + data.roomNumber);
  });

  socket.on('change CDMG', (data) => {
    io.to(data.roomNumber).emit('change CDMG', data)
    console.log('message: ' + data.roomNumber);
  });


  console.log('a user connected');
  
  socket.on('startGame', (data) => {
    io.to(data.roomNumber).emit('startGame', data)
    console.log('message: ' + data.players);
  });


});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
