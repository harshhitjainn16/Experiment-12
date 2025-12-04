# Simple Chat App 💬

A beginner-friendly real-time chat application built with Node.js, Express, and Socket.io. No login required - just choose a username and start chatting!

## Features

- ✅ Choose any username (no authentication needed)
- ✅ Real-time messaging with Socket.io
- ✅ See when other users are typing
- ✅ Live user count
- ✅ Join/Leave notifications
- ✅ Clean and responsive UI
- ✅ Message timestamps

## Tech Stack

**Backend:**
- Node.js
- Express.js
- Socket.io (WebSockets)

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Socket.io Client

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

4. Enter a username and start chatting!

### Development Mode

To run with auto-reload on file changes:
```bash
npm run dev
```

## How It Works

### WebSockets with Socket.io

This app demonstrates real-time communication using WebSockets through Socket.io:

1. **Connection**: When you join, a WebSocket connection is established
2. **Events**: Messages are sent/received through socket events
3. **Broadcasting**: Server broadcasts messages to all connected clients
4. **Real-time**: No page refresh needed - everything updates instantly!

### Socket Events

- `user-joined` - When a user enters the chat
- `user-left` - When a user disconnects
- `send-message` - Client sends a message
- `receive-message` - Client receives a message
- `typing` - User is typing indicator
- `stop-typing` - User stopped typing

## Project Structure

```
.
├── server.js           # Express server with Socket.io
├── public/
│   ├── index.html     # Chat interface
│   ├── styles.css     # Styling
│   └── app.js         # Frontend Socket.io client
├── package.json
└── README.md
```

## Testing the App

1. Open multiple browser windows/tabs
2. Enter different usernames in each
3. Start chatting and see real-time updates!
4. Try typing to see the typing indicator
5. Close a tab to see the leave notification

## What You'll Learn

- WebSocket communication
- Real-time event handling
- Socket.io client-server interaction
- Broadcasting to multiple clients
- Managing connected users

## License

ISC
