import { database, ref, push, set, onValue, onDisconnect } from './firebaseConfig.js';

// Получение элементов
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messageInput = document.getElementById('message');
const messagesContainer = document.getElementById('messages');

// Получение имени пользователя из localStorage
const user = JSON.parse(localStorage.getItem('SaturnNetUser'));
const userName = user ? user.name : 'Аноним';

// Функция для форматирования времени
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Отправка сообщения с именем пользователя и временной меткой
sendMessageBtn.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText.trim()) {
        const timestamp = getCurrentTime();
        const messageRef = push(ref(database, 'messages'));
        set(messageRef, {
            text: messageText,
            timestamp: timestamp,
            user: userName
        });
        messageInput.value = '';
    }
});

// Получение сообщений
const messagesRef = ref(database, 'messages');
onValue(messagesRef, (snapshot) => {
    messagesContainer.innerHTML = '';
    const messages = snapshot.val();
    if (messages) {
        for (let key in messages) {
            const message = messages[key];
            const messageElement = document.createElement('div');
            if (message.user === userName) {
                messageElement.classList.add('message', 'sent');
            } else {
                messageElement.classList.add('message', 'received');
            }

            // Создание элемента для имени пользователя
            const userElement = document.createElement('span');
            userElement.classList.add('message-user');
            userElement.textContent = message.user;

            // Создание индикатора статуса
            const userStatusIndicator = document.createElement('span');
            userStatusIndicator.classList.add('online-indicator');
            if (message.user === userName) {
                userStatusIndicator.style.backgroundColor = 'green';
            } else {
                userStatusIndicator.style.backgroundColor = 'gray';
            }

            // Добавление элементов в сообщение
            messageElement.appendChild(userElement);
            messageElement.appendChild(userStatusIndicator);
            const messageTextElement = document.createElement('span');
            messageTextElement.classList.add('message-text');
            messageTextElement.textContent = message.text;
            messageElement.appendChild(messageTextElement);

            // Добавление времени
            const messageTimeElement = document.createElement('span');
            messageTimeElement.classList.add('message-time');
            messageTimeElement.textContent = message.timestamp;
            messageElement.appendChild(messageTimeElement);

            messagesContainer.appendChild(messageElement);
        }
    }
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Установка статуса пользователя в сети
const userStatusRef = ref(database, `users/${userName}`);
set(userStatusRef, {
    name: userName,
    status: 'online',
    timestamp: Date.now()
});

// Удаление статуса пользователя при отключении
onDisconnect(userStatusRef).set({
    name: userName,
    status: 'offline',
    timestamp: Date.now()
});

// Отображение количества пользователей в сети
const usersRef = ref(database, 'users');
onValue(usersRef, (snapshot) => {
    const users = snapshot.val();
    let onlineCount = 0;
    for (let key in users) {
        if (users[key].status === 'online') {
            onlineCount++;
        }
    }
    // Обновление количества пользователей в сети
    const onlineCountElement = document.getElementById('onlineCount');
    onlineCountElement.textContent = `${onlineCount} в сети`;
});