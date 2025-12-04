import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import UsernameModal from './components/UsernameModal';
import ChatHeader from './components/ChatHeader';
import MessageContainer from './components/MessageContainer';
import TypingIndicator from './components/TypingIndicator';
import MessageInput from './components/MessageInput';

function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState(1);
  const [typingUser, setTypingUser] = useState('');

  const addMessage = useCallback((messageData) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      ...messageData,
      type: 'message'
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const addSystemMessage = useCallback((text, messageType) => {
    const systemMessage = {
      id: Date.now() + Math.random(),
      text,
      messageType,
      type: 'system'
    };
    setMessages(prev => [...prev, systemMessage]);
  }, []);

  const joinChat = useCallback(() => {
    if (!username.trim()) return;

    const serverUrl = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:3001';
    const newSocket = io(serverUrl, {
      transports: ['websocket', 'polling']
    });
    setSocket(newSocket);
    setIsJoined(true);

    // Emit user joined event
    newSocket.emit('user-joined', username);

    // Setup socket event listeners
    newSocket.on('user-joined', (data) => {
      setUserCount(data.userCount);
      if (data.username !== username) {
        addSystemMessage(`${data.username} joined the chat`, 'join');
      }
    });

    newSocket.on('user-left', (data) => {
      setUserCount(data.userCount);
      addSystemMessage(`${data.username} left the chat`, 'leave');
    });

    newSocket.on('receive-message', (data) => {
      addMessage(data);
    });

    newSocket.on('user-typing', (typingUsername) => {
      setTypingUser(typingUsername);
    });

    newSocket.on('user-stop-typing', () => {
      setTypingUser('');
    });

    return () => {
      newSocket.close();
    };
  }, [username, addMessage, addSystemMessage]);

  const sendMessage = useCallback((message) => {
    if (socket && message.trim()) {
      socket.emit('send-message', { message });
    }
  }, [socket]);

  const handleTyping = useCallback(() => {
    if (socket) {
      socket.emit('typing');
    }
  }, [socket]);

  const handleStopTyping = useCallback(() => {
    if (socket) {
      socket.emit('stop-typing');
    }
  }, [socket]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  if (!isJoined) {
    return (
      <UsernameModal
        username={username}
        setUsername={setUsername}
        onJoin={joinChat}
      />
    );
  }

  return (
    <div className="chat-container">
      <ChatHeader username={username} userCount={userCount} />
      <MessageContainer messages={messages} username={username} />
      <TypingIndicator typingUser={typingUser} />
      <MessageInput
        onSendMessage={sendMessage}
        onTyping={handleTyping}
        onStopTyping={handleStopTyping}
      />
    </div>
  );
}

export default App;