let chatMessages = []; // Array to store chat messages

// JavaScript for handling user interactions and dynamic content

function sendMessage() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value;
    if (message || file) {
        if (message) {
            chatMessages.push(message); // Store the message
        }
        displayMessages(file); // Update the chat window
        messageInput.value = ''; // Clear the input
        fileInput.value = ''; // Clear the file input
    }
}

function displayMessages(file) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear previous messages
    chatMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = msg;
        messagesContainer.appendChild(messageElement);
    });
    
    // Display uploaded files
    if (file) {
        const fileElement = document.createElement('div');
        fileElement.textContent = `File sent: ${file.name}`;
        messagesContainer.appendChild(fileElement);
    }
}

function startCall() {
    alert('Call feature is not implemented yet.'); // Placeholder for call functionality
}

function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
        alert('Please fill in both fields.');
        return false;
    }
    return true;
}

function validateRegistration() {
    const newUsername = document.getElementById('new-username').value;
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
    if (!newUsername || !newEmail || !newPassword) {
        alert('Please fill in all fields.');
        return false;
    }
    return true;
}

// New function to handle registration form submission
document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    if (!validateRegistration()) {
        return;
    }
    const username = document.getElementById('new-username').value;
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;

    try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.text();
        if (response.ok) {
            alert('Registration successful! You can now login.');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed: ' + result);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// New function to handle login form submission
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    if (!validateLogin()) {
        return;
    }
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            // Redirect to home or chat page after login
            window.location.href = 'index.html';
        } else {
            const errorText = await response.text();
            alert('Login failed: ' + errorText);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Function to initialize chat functionality
function initChat() {
    // Chat initialization code will go here
}

// Call the initChat function when the page loads
window.onload = initChat;

// Add slide-out animation on link clicks and navigate after animation
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        // Only handle internal links (same origin)
        if (link.origin === window.location.origin) {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                document.body.classList.add('slide-out');
                document.body.addEventListener('animationend', () => {
                    window.location.href = href;
                }, { once: true });
            });
        }
    });
});
