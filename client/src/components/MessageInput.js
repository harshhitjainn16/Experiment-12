import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, onTyping, onStopTyping }) => {
  const [message, setMessage] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Typing indicator logic
    onTyping();
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const timeout = setTimeout(() => {
      onStopTyping();
    }, 1000);
    
    setTypingTimeout(timeout);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      onStopTyping();
      
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', width: '100%' }}>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;