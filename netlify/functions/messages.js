const fs = require('fs');
const path = require('path');

const messagesFilePath = path.join(process.cwd(), 'messages.json');

function loadMessages() {
    if (!fs.existsSync(messagesFilePath)) {
        fs.writeFileSync(messagesFilePath, '[]');
    }
    const data = fs.readFileSync(messagesFilePath);
    return JSON.parse(data);
}

function saveMessages(messages) {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
}

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        const messages = loadMessages();
        return {
            statusCode: 200,
            body: JSON.stringify(messages),
        };
    } else if (event.httpMethod === 'POST') {
        const { username, message } = JSON.parse(event.body);
        const messages = loadMessages();
        messages.push({ username, message });
        saveMessages(messages);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } else {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }
};
