
var SSE = require('sse');
var express = require('express');
var http = require('http');
var app = express().use(express.static('public'));
var server = http.createServer(app);

var clients = [];

server.listen(8080, '127.0.0.1', function() {
  var sse = new SSE(server);

  sse.on('connection', function(socket) {
    clients.push(socket);
    console.log('Opened connection 🎉');

    var json = JSON.stringify({ message: 'Gotcha' });
    socket.send(json);
    console.log('Sent: ' + json);

    socket.on('message', function(message) {
      console.log('Received: ' + message);
    });

    socket.on('close', function() {
      clients.splice(clients.indexOf(socket), 1);
      console.log('Closed Connection');
    });
  });
});

var broadcast = function() {
  var json = JSON.stringify({ message: 'Hello hello!' });

  clients.forEach(function(socket) {
    socket.send(json);
    console.log('Sent Message: ' + json);
  });
}
setInterval(broadcast, 3000)
