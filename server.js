const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));

// Store active users
const users = new Map();

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Handle user joining
  socket.on('user-joined', (username) => {
    users.set(socket.id, username);
    
    // Broadcast to all clients that a new user joined
    io.emit('user-joined', {
      username: username,
      userCount: users.size
    });
    
    console.log(`${username} joined the chat`);
  });

  // Handle new messages
  socket.on('send-message', (data) => {
    const username = users.get(socket.id);
    const messageData = {
      username: username,
      message: data.message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Broadcast message to all clients
    io.emit('receive-message', messageData);
  });

  // Handle user typing
  socket.on('typing', () => {
    const username = users.get(socket.id);
    socket.broadcast.emit('user-typing', username);
  });

  socket.on('stop-typing', () => {
    socket.broadcast.emit('user-stop-typing');
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    
    if (username) {
      io.emit('user-left', {
        username: username,
        userCount: users.size
      });
      console.log(`${username} left the chat`);
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
});
