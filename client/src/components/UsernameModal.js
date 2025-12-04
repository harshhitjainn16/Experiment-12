import React from 'react';

const UsernameModal = ({ username, setUsername, onJoin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin();
    } else {
      alert('Please enter a username!');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>💬 Welcome to Chat App</h1>
        <p>Choose a username to get started</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="username-input"
            placeholder="Enter your username..."
            maxLength="20"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button type="submit" className="join-btn">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;