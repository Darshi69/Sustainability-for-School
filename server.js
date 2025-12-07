
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

document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.getElementById("userInput");
    if (inputBox) {
        inputBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

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

    return "That's a great question! Unfortunately, I can't answer those type of questions as I am pre-answer written ChatBot, but not an AI.";
}


function handleFormSubmit(event) {
    event.preventDefault(); 
    
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const grade = document.getElementById('grade').value;
    
    
    sendEmail(name, email, grade);
    
    
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('joinForm');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
    

    setTimeout(() => {
        successMessage.style.display = 'none';
        form.style.display = 'block';
        form.reset();
    }, 5000);
    
    return false;
}

function sendEmail(name, email, grade) {
    
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            grade: grade,
            _replyto: email,
            _subject: 'New Sustainability Programme Registration'
        })
    });
}


