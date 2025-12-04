// DOM Elements
const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
const joinBtn = document.getElementById('joinBtn');
const chatContainer = document.getElementById('chatContainer');
const currentUsernameDisplay = document.getElementById('currentUsername');
const userCountDisplay = document.getElementById('userCount');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');

// Initialize Socket.io
let socket;
let username = '';
let typingTimeout;

// Event Listeners
joinBtn.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
});

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

messageInput.addEventListener('input', () => {
    socket.emit('typing');
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        socket.emit('stop-typing');
    }, 1000);
});

// Join chat room
function joinChat() {
    const enteredUsername = usernameInput.value.trim();
    
    if (!enteredUsername) {
        alert('Please enter a username!');
        return;
    }
    
    username = enteredUsername;
    
    // Hide modal and show chat
    usernameModal.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    currentUsernameDisplay.textContent = username;
    
    // Initialize socket connection
    socket = io();
    
    // Emit user joined event
    socket.emit('user-joined', username);
    
    // Setup socket event listeners
    setupSocketListeners();
    
    // Focus on message input
    messageInput.focus();
}

// Setup socket event listeners
function setupSocketListeners() {
    // User joined
    socket.on('user-joined', (data) => {
        userCountDisplay.textContent = data.userCount;
        
        if (data.username !== username) {
            addSystemMessage(`${data.username} joined the chat`, 'join');
        }
    });
    
    // User left
    socket.on('user-left', (data) => {
        userCountDisplay.textContent = data.userCount;
        addSystemMessage(`${data.username} left the chat`, 'leave');
    });
    
    // Receive message
    socket.on('receive-message', (data) => {
        addMessage(data);
    });
    
    // User typing
    socket.on('user-typing', (username) => {
        typingIndicator.textContent = `${username} is typing...`;
        typingIndicator.classList.remove('hidden');
    });
    
    // User stopped typing
    socket.on('user-stop-typing', () => {
        typingIndicator.classList.add('hidden');
    });
}

// Send message
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Emit message to server
    socket.emit('send-message', { message });
    
    // Clear input
    messageInput.value = '';
    socket.emit('stop-typing');
}

// Add message to chat
function addMessage(data) {
    // Remove welcome message if exists
    const welcomeMsg = messagesContainer.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    const isOwnMessage = data.username === username;
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-username">${data.username}${isOwnMessage ? ' (You)' : ''}</span>
            <span class="message-time">${data.timestamp}</span>
        </div>
        <div class="message-text">${escapeHtml(data.message)}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add system message
function addSystemMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `system-message ${type}`;
    messageDiv.textContent = text;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
