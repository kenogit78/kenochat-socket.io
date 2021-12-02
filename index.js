var express = require('express');
const nodemon = require('nodemon');
var socket = require('socket.io');

//app setup
var app = express();

var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    console.log('listening to requests on port ' + port);
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
