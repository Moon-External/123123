const baseUrl = '/.netlify/functions/messages';

async function loadMessages() {
    try {
        const response = await fetch(baseUrl);
        const messages = await response.json();
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${msg.username}: ${msg.message}`;
            messagesDiv.appendChild(messageElement);
        });
    } catch (error) {
        console.error('Ошибка при загрузке сообщений:', error);
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message) {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, message }),
            });
            if (response.ok) {
                messageInput.value = '';
                loadMessages();
            } else {
                console.error('Ошибка при отправке сообщения');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    } else {
        alert('Пожалуйста, введите сообщение.');
    }
}
