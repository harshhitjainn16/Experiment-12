# React Chat App 💬

A modern real-time chat application built with React.js, Node.js, Express, and Socket.io. No login required - just choose a username and start chatting!

## Features

- ✅ Modern React.js frontend with hooks
- ✅ Component-based architecture
- ✅ Real-time messaging with Socket.io
- ✅ Choose any username (no authentication needed)
- ✅ See when other users are typing
- ✅ Live user count
- ✅ Join/Leave notifications
- ✅ Clean and responsive UI
- ✅ Message timestamps
- ✅ Auto-scroll to new messages

## Tech Stack

**Frontend:**
- React.js 18
- Modern React Hooks (useState, useEffect, useCallback)
- Socket.io Client
- CSS3 with animations

**Backend:**
- Node.js
- Express.js
- Socket.io (WebSockets)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install client dependencies:
```bash
cd client
npm install
cd ..
```

### Development Mode

To run both server and client simultaneously:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- React development server on `http://localhost:3000`

### Production Build

1. Build the React app:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

The app will be available at `http://localhost:3001`

## React Architecture

### Components Structure

```
src/
├── App.js                    # Main app component with state management
├── components/
│   ├── UsernameModal.js      # Username input modal
│   ├── ChatHeader.js         # Chat header with user info
│   ├── MessageContainer.js   # Container for all messages
│   ├── Message.js            # Individual message component
│   ├── SystemMessage.js      # System notifications
│   ├── TypingIndicator.js    # Shows who's typing
│   └── MessageInput.js       # Message input with send button
├── index.css                 # Global styles
└── index.js                  # React app entry point
```

### Key React Features Used

- **useState**: Managing component state (messages, username, socket connection)
- **useEffect**: Handling side effects and cleanup
- **useCallback**: Optimizing performance for event handlers
- **Component Props**: Passing data between components
- **Event Handling**: Form submissions and user interactions
- **Conditional Rendering**: Showing/hiding components based on state

## Socket Events

- `user-joined` - When a user enters the chat
- `user-left` - When a user disconnects
- `send-message` - Client sends a message
- `receive-message` - Client receives a message
- `typing` - User is typing indicator
- `stop-typing` - User stopped typing

## Project Structure

```
.
├── server.js              # Express server with Socket.io
├── client/                # React frontend
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Styles
│   └── package.json       # Client dependencies
├── package.json           # Root dependencies
└── README.md
```

## Testing the App

1. Run `npm run dev`
2. Open multiple browser windows/tabs to `http://localhost:3000`
3. Enter different usernames in each
4. Start chatting and see real-time updates!
5. Try typing to see the typing indicator
6. Close a tab to see the leave notification

## What You'll Learn

### React Concepts:
- Functional components with hooks
- State management with useState
- Side effects with useEffect
- Performance optimization with useCallback
- Component composition and props
- Event handling in React
- Conditional rendering

### WebSocket Concepts:
- Real-time communication
- Socket.io client-server interaction
- Broadcasting to multiple clients
- Managing connected users

## Deployment

This app is ready for deployment on platforms like:
- **Vercel** (for the full-stack app)
- **Netlify** (frontend only, needs separate backend)
- **Heroku** (full-stack)
- **Railway** (full-stack)
- **Render** (full-stack)

The build process automatically creates an optimized production build of the React app.

## License

ISC
