

var http = require('http');
var express = require('express');
var SSE = require('sse');

var app = express().use(express.static('public'));
var server = http.createServer(app);
var clients = [];

server.listen(8080, '127.0.0.1', function() {
  var sse = new SSE(server);

  sse.on('connection', function(stream) {
    clients.push(stream);
    console.log('Opened connection 🎉');

    var json = JSON.stringify({ message: 'Gotcha' });
    stream.send(json);
    console.log('Sent: ' + json);

    stream.on('message', function(message) {
      console.log('Received: ' + message);
    });

    stream.on('close', function() {
      clients.splice(clients.indexOf(stream), 1);
      console.log('Closed connection 😱');
    });
  });
});

var broadcast = function() {
  var json = JSON.stringify({ message: 'Hello hello!' });

  clients.forEach(function(stream) {
    stream.send(json);
    console.log('Sent: ' + json);
  });
}
setInterval(broadcast, 3000)
