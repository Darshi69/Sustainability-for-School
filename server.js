// Tab switching functionality
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Real-time stats animation
let waterValue = 1250;
let energyValue = 5250;

setInterval(() => {
    waterValue += Math.random() * 2;
    energyValue += Math.random() * 5;
    
    const waterElement = document.getElementById('waterStat');
    const energyElement = document.getElementById('energyStat');
    
    if (waterElement) {
        waterElement.textContent = Math.floor(waterValue).toLocaleString();
    }
    if (energyElement) {
        energyElement.textContent = Math.floor(energyValue).toLocaleString();
    }
}, 3000);

// Goals functionality
let goals = [];

function toggleGoalForm() {
    const form = document.getElementById('goalForm');
    if (form.style.display === 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

function addGoal() {
    const nameInput = document.getElementById('goalName');
    const textInput = document.getElementById('goalText');
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    
    if (name && text) {
        goals.push({ 
            name: name, 
            text: text, 
            date: new Date().toLocaleDateString() 
        });
        
        nameInput.value = '';
        textInput.value = '';
        toggleGoalForm();
        renderGoals();
    } else {
        alert('Please fill in both fields!');
    }
}

function renderGoals() {
    const list = document.getElementById('goalsList');
    
    if (goals.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #6b7280;">
                <p style="font-size: 1.1rem;">No goals yet. Start by adding your first goal!</p>
            </div>
        `;
    } else {
        list.innerHTML = goals.map(goal => `
            <div class="goal-item">
                <h3>${goal.name}</h3>
                <p>${goal.text}</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem; color: #9ca3af;">Started on ${goal.date}</p>
            </div>
        `).join('');
    }
}

// Poll functionality
const pollQuestions = [
    {
        question: "How often do you use reusable bags for shopping?",
        options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"]
    },
    {
        question: "Do you actively reduce your energy consumption at home?",
        options: ["Yes, consistently", "Yes, occasionally", "Thinking about it", "Not really", "No"]
    },
    {
        question: "How do you usually commute?",
        options: ["Walk/Bike", "Public transport", "Carpool", "Personal vehicle", "Varies"]
    },
    {
        question: "Do you recycle waste regularly?",
        options: ["Always", "Most items", "Some items", "Rarely", "Never"]
    },
    {
        question: "How often do you buy locally sourced products?",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
    }
];

let pollAnswers = {};

function renderPoll() {
    const container = document.getElementById('pollQuestions');
    
    container.innerHTML = pollQuestions.map((q, qIdx) => `
        <div class="poll-question">
            <h3>${qIdx + 1}. ${q.question}</h3>
            <div class="poll-options">
                ${q.options.map((option, oIdx) => `
                    <div class="poll-option" onclick="selectPollOption(${qIdx}, ${oIdx})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function selectPollOption(questionIdx, optionIdx) {
    // Save the answer
    pollAnswers[questionIdx] = optionIdx;
    
    // Update UI to show selection
    const questions = document.querySelectorAll('.poll-question');
    const question = questions[questionIdx];
    const options = question.querySelectorAll('.poll-option');
    
    options.forEach((opt, idx) => {
        if (idx === optionIdx) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
}

function submitPoll() {
    // Check if all questions are answered
    if (Object.keys(pollAnswers).length !== pollQuestions.length) {
        alert('Please answer all questions before submitting!');
        return;
    }
    
    // Show success message
    const container = document.getElementById('pollQuestions');
    container.innerHTML = `
        <div class="success-message">
            <div class="checkmark"></div>
            <h2 style="color: #1f2937; margin-bottom: 1rem;">Thank You!</h2>
            <p style="color: #6b7280; font-size: 1.1rem; margin-bottom: 2rem;">Your responses have been recorded.</p>
            
            <div style="text-align: left; max-width: 600px; margin: 0 auto;">
                ${pollQuestions.map((q, idx) => `
                    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                        <p style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">${q.question}</p>
                        <p style="color: #059669; font-weight: 600;">✓ ${q.options[pollAnswers[idx]]}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Change button to "Retake Poll"
    const submitButton = document.querySelector('#poll .btn-primary');
    submitButton.textContent = 'Retake Poll';
    submitButton.onclick = () => {
        pollAnswers = {};
        renderPoll();
        submitButton.textContent = 'Submit Poll';
        submitButton.onclick = submitPoll;
    };
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderGoals();
    renderPoll();
    
    console.log('✅ Sustainability Tracker Loaded Successfully!');
    console.log('📊 Dashboard ready');
    console.log('🎯 Goals system initialized');
    console.log('🗳️ Poll system ready');
});

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Goals Management
const goalsData = [];

function toggleGoalForm() {
    const form = document.getElementById('goalForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function addGoal() {
    const name = document.getElementById('goalName').value;
    const goalText = document.getElementById('goalText').value;
    
    if (name && goalText) {
        goalsData.push({ name, goal: goalText });
        renderGoals();
        document.getElementById('goalName').value = '';
        document.getElementById('goalText').value = '';
        toggleGoalForm();
    }
}

function renderGoals() {
    const goalsList = document.getElementById('goalsList');
    goalsList.innerHTML = goalsData.map((g, i) => `
        <div class="goal-item">
            <div>
                <strong>${g.name}</strong>
                <p>${g.goal}</p>
            </div>
            <button class="btn-secondary" onclick="removeGoal(${i})">Remove</button>
        </div>
    `).join('');
}

function removeGoal(index) {
    goalsData.splice(index, 1);
    renderGoals();
}

// Poll Management
const pollData = [
    {
        question: "How often do you use reusable bags?",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
    },
    {
        question: "Do you separate recyclables from trash?",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
    },
    {
        question: "How do you usually get to school?",
        options: ["Walk/Bike", "Public Transport", "Carpool", "Personal Car"]
    }
];

function renderPoll() {
    const container = document.getElementById('pollQuestions');
    container.innerHTML = pollData.map((q, i) => `
        <div class="poll-question">
            <p style="font-weight: 600; margin-bottom: 1rem;">${i + 1}. ${q.question}</p>
            ${q.options.map(opt => `
                <label class="poll-option">
                    <input type="radio" name="question${i}" value="${opt}">
                    <span>${opt}</span>
                </label>
            `).join('')}
        </div>
    `).join('');
}

function submitPoll() {
    const answered = pollData.every((q, i) => {
        return document.querySelector(`input[name="question${i}"]:checked`);
    });
    
    if (answered) {
        showNotification('Thank you for completing the poll! 🌱', 'success');
    } else {
        showNotification('Please answer all questions', 'error');
    }
}

// Challenge Join Animation
function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '🎉' : '⚠️'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add event listeners to all "Join Challenge" buttons
function setupChallengeButtons() {
    const challengeButtons = document.querySelectorAll('.challenge-card .btn-primary');
    challengeButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            const challengeCard = this.closest('.challenge-card');
            const challengeName = challengeCard.querySelector('h3').textContent;
            
            // Change button state
            this.textContent = 'Joined! ✓';
            this.style.background = '#10b981';
            this.disabled = true;
            this.style.cursor = 'not-allowed';
            
            // Show notification
            showNotification(`Thanks for joining ${challengeName}! 🌟`, 'success');
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderPoll();
    setupChallengeButtons();
});
