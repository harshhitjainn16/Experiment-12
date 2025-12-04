import React from 'react';

const TypingIndicator = ({ typingUser }) => {
  if (!typingUser) return null;

  return (
    <div className="typing-indicator">
      {typingUser} is typing...
    </div>
  );
};

export default TypingIndicator;