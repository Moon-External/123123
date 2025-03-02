const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const messagesFilePath = path.join(__dirname, 'messages.json');

// Загружаем сообщения из файла
function loadMessages() {
    if (!fs.existsSync(messagesFilePath)) {
        fs.writeFileSync(messagesFilePath, '[]');
    }
    const data = fs.readFileSync(messagesFilePath);
    return JSON.parse(data);
}

// Сохраняем сообщения в файл
function saveMessages(messages) {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
}

// Получить все сообщения
app.get('/messages', (req, res) => {
    const messages = loadMessages();
    res.json(messages);
});

// Отправить новое сообщение
app.post('/send', (req, res) => {
    const { username, message } = req.body;
    const messages = loadMessages();
    messages.push({ username, message });
    saveMessages(messages);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});