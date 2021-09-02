var express = require('express');
const nodemon = require('nodemon');
var socket = require('socket.io');

//app setup
var app = express();

var server = app.listen(3000, function(){
    console.log('listening to requests on port 3000');
});


//static files(middlewares)
app.use(express.static('public'));


//socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('socket connection successful', socket.id);

    
    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
