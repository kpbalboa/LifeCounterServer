// const { Socket } = require('dgram');
// const { create } = require('domain');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const databaseRoutes = require("./routes")
app.use('/', databaseRoutes)
var bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors());
app.use(express.json());



const io = require("socket.io")(server, {
  cors: {
    origin: "*",
   
  }
});

let users = [];
let roomNumber= 0

io.on('connection',  (socket) => {

  socket.on("join room", (roomNumber)=>{
    console.log(roomNumber.roomNumber.roomNum)
    socket.join(roomNumber.roomNumber.roomNum);
    io.to(roomNumber.roomNumber.roomNum).emit("join room", roomNumber.roomNumber, roomNumber.commander, roomNumber.CImage, roomNumber.LoggedIn, roomNumber.UserName, roomNumber.partner, roomNumber.partnerImg)
  })

  socket.on('NewRoom', () => {
    roomNumber++;
    socket.join(roomNumber);
    socket.emit("NewRoom", roomNumber)
  });



  

  socket.on('get data', (data) => {
    io.to(data.roomNumber).emit('get data', data)
  });


  socket.on('changeGame', (data) => {
    io.to(data.roomNumber).emit('changeGame', data)
   
  });


  console.log('a user connected');
  
  socket.on('startGame', (data) => {
    io.to(data.roomNumber).emit('startGame', data)
  });


});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
