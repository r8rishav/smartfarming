document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDarkMode = body.classList.contains('dark-theme');
        if (isDarkMode) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Chatbot ---
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');

    // --- Gemini API Configuration ---
    const API_KEY = "AIzaSyC63oNm7KxXnhhcmRf7k74HLpKER1D4hJg"; // आपकी API की यहां डाल दी गई है
   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
    
    const projectDescription = `
        Project Title: A Brief Review on Smart Farming Technologies for Precision Agriculture.
        Authors: Rishav Raj, Amar Pal, Arijit Ghosh, Soumik Kumar Kundu, Samit Karmakar from the Institute of Engineering & Management, Kolkata.
        Core Idea: This project reviews modern technologies like the Internet of Things (IoT), Artificial Intelligence (AI), Machine Learning (ML), Deep Learning, and Blockchain for precision agriculture.
        Goal: To enhance agricultural productivity and sustainability to meet the food demands of a growing global population.
        Key Applications: Smart irrigation using sensors, crop health monitoring with AI and drones, yield prediction models, and creating transparent supply chains with blockchain.
    `;

    chatBubble.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatBubble.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatBubble.style.display = 'block';
    });

    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        appendMessage(userMessage, 'user');
        userInput.value = '';
        showTypingIndicator();

        try {
            const aiResponse = await getAIResponse(userMessage);
            removeTypingIndicator();
            appendMessage(aiResponse, 'ai');
        } catch (error) {
            removeTypingIndicator();
            appendMessage("Sorry, I'm having trouble connecting. Please try again later.", 'ai');
            console.error("Error fetching AI response:", error);
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'ai', 'typing-indicator');
        typingElement.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        chatBody.appendChild(typingElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingElement = chatBody.querySelector('.typing-indicator');
        if (typingElement) {
            chatBody.removeChild(typingElement);
        }
    }
    
    async function getAIResponse(userMessage) {
        const prompt = `
            User_message: "${userMessage}". 
            Reply naturally to the user message. If required, answer based on the following project description: ${projectDescription}.
            Act as if you are a project expert talking to someone. Keep your sentences short and friendly.
        `;

        const requestBody = {
            contents: [{
                parts: [{ "text": prompt }]
            }]
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});