import React from 'react';

const Message = ({ message, isOwn }) => {
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  return (
    <div className="message">
      <div className="message-header">
        <span className="message-username">
          {message.username}{isOwn ? ' (You)' : ''}
        </span>
        <span className="message-time">{message.timestamp}</span>
      </div>
      <div 
        className="message-text"
        dangerouslySetInnerHTML={{ __html: escapeHtml(message.message) }}
      />
    </div>
  );
};

export default Message;