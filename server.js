

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

// can receive from the client with standard http and broadcast

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.post('/api', function(req, res) {
  var message = JSON.stringify(req.body);
  console.log('Received: ' + message);
  res.status(200).end();

  var json = JSON.stringify({ message: 'Something changed' });
  clients.forEach(function(stream) {
    stream.send(json);
    console.log('Sent: ' + json);
  });
})
