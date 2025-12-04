import React from 'react';

const ChatHeader = ({ username, userCount }) => {
  return (
    <div className="chat-header">
      <h1>💬 Simple Chat App</h1>
      <div className="user-info">
        <span>{username}</span>
        <span className="user-count">👥 {userCount} online</span>
      </div>
    </div>
  );
};

export default ChatHeader;