import React from 'react';

const SystemMessage = ({ message }) => {
  return (
    <div className={`system-message ${message.messageType}`}>
      {message.text}
    </div>
  );
};

export default SystemMessage;