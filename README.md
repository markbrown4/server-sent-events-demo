# Server-sent Events Demo

Server-sent events allow you to open a long held HTTP connection to stream data back to the client.
On the client you open a connection by creating an `EventSource` with a url to the streaming endpoint.

```bash
npm install
npm start
open http://localhost:8080/
```

Try opening multiple browsers and looking at the logs on client and server.
Here's what's happening:

- The client initiates an http request to `/sse` via `EventSource`
- The server sends `{ message: 'Gotcha '}` when a connection is established.
- The server keeps an array of all connected `clients`.
- Every three seconds the server broadcasts `{ message: 'Hello hello!' }` to all connections.
- Connections can be closed by hitting the Close button or closing the window.
- You can send `{ message: 'Hey' }` to the server by hitting `Send Message`.
- The server sends `{ message: 'Something changed' }` to all connections when a message is received.

A nice thing about `EventSource` is that it tries to re-establish lost connections automatically, to see how this works stop the server while the browser is connected.  You'll see some polling start to occur and error events logged until you start up the server again.

## Links

- [React to data changes](http://rauchg.com/2014/7-principles-of-rich-web-applications/#react-to-data-changes)
- [Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
