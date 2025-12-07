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
