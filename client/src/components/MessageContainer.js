import React, { useEffect, useRef } from 'react';
import Message from './Message';
import SystemMessage from './SystemMessage';

const MessageContainer = ({ messages, username }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messages-container">
      {messages.length === 0 ? (
        <div className="welcome-message">
          Welcome to the chat! Start a conversation 🎉
        </div>
      ) : (
        messages.map((msg) =>
          msg.type === 'system' ? (
            <SystemMessage key={msg.id} message={msg} />
          ) : (
            <Message key={msg.id} message={msg} isOwn={msg.username === username} />
          )
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;