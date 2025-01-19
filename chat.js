import { database } from './firebaseConfig.js';

// Обработчик для кнопки отправки сообщения
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messageInput = document.getElementById('message');
const messagesContainer = document.getElementById('messages');

// Отправка сообщения
sendMessageBtn.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText.trim()) {
        const messageRef = push(ref(database, 'messages'));
        set(messageRef, {
            text: messageText,
            timestamp: Date.now()
        });
        messageInput.value = '';
    }
});

// Получение сообщений
const messagesRef = ref(database, 'messages');
onValue(messagesRef, (snapshot) => {
    messagesContainer.innerHTML = '';
    const messages = snapshot.val();
    for (let key in messages) {
        const message = messages[key];
        const messageElement = document.createElement('div');
        messageElement.textContent = message.text;
        messagesContainer.appendChild(messageElement);
    }
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});