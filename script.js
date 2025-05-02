const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const question = userInput.value;
  appendMessage('You', question, 'user-msg');
  userInput.value = '';

  appendMessage('Bot', 'Thinking...', 'bot-msg');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;
    updateLastBotMessage(answer);
  } catch (error) {
    updateLastBotMessage("Sorry, something went wrong.");
  }
});

function appendMessage(sender, message, className) {
  const msg = document.createElement('div');
  msg.className = `my-2 ${className}`;
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(newText) {
  const botMessages = document.querySelectorAll('.bot-msg');
  if (botMessages.length > 0) {
    botMessages[botMessages.length - 1].innerHTML = `<strong>Bot:</strong> ${newText}`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
