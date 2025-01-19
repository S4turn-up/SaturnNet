// Обработчик для кнопки регистрации
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');

if (registerBtn && loginBtn) {
    registerBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        if (name && password) {
            localStorage.setItem('SaturnNetUser', JSON.stringify({ name, password }));
            alert('Успешная регистрация!');
            window.location.href = 'chat.html';
        } else {
            alert('Введите имя и пароль.');
        }
    });

    // Обработчик для кнопки входа
    loginBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const user = JSON.parse(localStorage.getItem('SaturnNetUser'));

        if (user) {
            if (user.name === name && user.password === password) {
                alert(`Добро пожаловать, ${name}!`);
                window.location.href = 'chat.html';
            } else {
                alert('Неверное имя или пароль.');
            }
        } else {
            alert('Пользователь не найден. Пожалуйста, зарегистрируйтесь.');
        }
    });
}

// Логика чата
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messagesContainer = document.getElementById('messages');

if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', () => {
        const messageInput = document.getElementById('message');
        const messageText = messageInput.value;

        if (messageText.trim()) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'sent');
            messageElement.textContent = messageText;

            messagesContainer.appendChild(messageElement);
            messageInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });
}