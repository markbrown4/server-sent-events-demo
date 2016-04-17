var stream = new EventSource("/sse");

stream.onopen = function() {
  log('Opened connection 🎉');
};

stream.onerror = function (event) {
  log('Error: ' + JSON.stringify(event));
};

stream.onmessage = function (event) {
  log('Received Message: ' + event.data);
};

document.querySelector('#close').addEventListener('click', function(event) {
  stream.close();
  log('Closed connection 😱');
});

var list = document.getElementById('log');
var log = function(text) {
  var li = document.createElement('li');
  li.innerHTML = text;
  list.appendChild(li);
}

window.addEventListener('beforeunload', function() {
  stream.close();
});
