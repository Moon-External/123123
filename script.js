let username = '';

function login() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        loadMessages();
    } else {
        alert('Пожалуйста, введите имя пользователя.');
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message) {
        const response = await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, message }),
        });
        if (response.ok) {
            messageInput.value = '';
            loadMessages();
        }
    }
}

async function loadMessages() {
    const response = await fetch('/messages');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.username}: ${msg.message}`;
        messagesDiv.appendChild(messageElement);
    });
}

// Загружаем сообщения каждые 2 секунды
setInterval(loadMessages, 2000);