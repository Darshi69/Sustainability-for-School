
function toggleChat() {
    const chat = document.getElementById("chatWindow");
    chat.style.display = (chat.style.display === "block") ? "none" : "block";
}

function sendMessage() {
    const inputBox = document.getElementById("userInput");
    const message = inputBox.value.trim();
    if (message === "") return;

    addUserMessage(message);
    inputBox.value = "";

    setTimeout(() => {
        let botReply = getBotReply(message);
        addBotMessage(botReply);
    }, 500);
}

function addUserMessage(text) {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML += `
        <div class="user-message"><strong>You:</strong> ${text}</div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML += `
        <div class="bot-message"><strong>Bot:</strong> ${text}</div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function getBotReply(userMsg) {
    const msg = userMsg.toLowerCase();

    if (msg.includes("water")) 
        return "Using bucket baths instead of showers and fixing leaks can save up to 60% water! 💧";

    if (msg.includes("plastic")) 
        return "Try using metal bottles or lunch boxes. Single-use plastic harms oceans a lot. 🌊";

    if (msg.includes("energy"))
        return "Turning off fans/lights when not needed is the easiest way to save energy! ⚡";

    if (msg.includes("food"))
        return "Take only what you can finish. Food waste releases harmful gases! 🍽️";

    if (msg.includes("what is sustainability"))
        return "Sustainability means using resources without harming the future. 🌱";

    if (msg.includes("hi") || msg.includes("hello"))
        return "Hello! Ask me anything about sustainability! 🌍";

    return "That's a great question! Try asking me about water saving, plastic reduction, or energy conservation. 🌱";
}

