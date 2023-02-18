const express = require('express'); // import the express package  
const app = express();
const http = require('http');
const server = http.createServer(app);


const { Server } = require("socket.io");
const io = new Server(server);


const port = process.env.PORT || 3000;

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});


//socket.io ecripts 
io.on('connection', (socket) => {
  console.log('chat user connected');
  socket.emit('connected', { sID: socket.id })



  //step1 -recieve incoming message 
  socket.on('chat_message', function (msg) {
    console.log(msg); //have a look at the message data


    // step 2 
    //rebroadcast the current message to everyone connected to ur chat service 
    io.emit('new_message', { id: socket.id, message: msg });

  })

  socket.on('typing_event', function (user) {
    io.emit('typing', user);
  })
});



