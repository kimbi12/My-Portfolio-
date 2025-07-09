 
        // Counter Animation Function
        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + (target - start) * easeOutQuart);
                
                element.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }
            
            requestAnimationFrame(updateCounter);
        }

        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('fade-in')) {
                        entry.target.classList.add('visible');
                    }
                    
                    if (entry.target.classList.contains('counter')) {
                        const target = parseInt(entry.target.getAttribute('data-target'));
                        animateCounter(entry.target, target);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Observe elements
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        document.querySelectorAll('.counter').forEach(el => observer.observe(el));

        // Initial page load animation
        document.addEventListener('DOMContentLoaded', function() {
            const aboutSection = document.querySelector('.about-section');
            aboutSection.style.opacity = '0';
            aboutSection.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                aboutSection.style.transition = 'opacity 1s ease, transform 1s ease';
                aboutSection.style.opacity = '1';
                aboutSection.style.transform = 'translateY(0)';
            }, 100);
        });

        // Chatbot Logic
document.addEventListener("DOMContentLoaded", () => {
  const chatbot = document.getElementById('chatbot');
  const chatbotBody = chatbot.querySelector('.chatbot-body');
  const chatbotHeader = chatbot.querySelector('.chatbot-header');

  // Toggle visibility
  chatbotHeader.addEventListener('click', () => {
    chatbot.classList.toggle('active');
  });

  // Load HTML UI
  chatbotBody.innerHTML = `
    <div class="chat-log">
      <p>Hello! 👋 I'm your virtual assistant.</p>
      <p>Try asking me:</p>
      <ul>
        <li>Tell me about your Data Analytics projects</li>
        <li>What web & design work do you do?</li>
        <li>What services do you offer?</li>
        <li>How can I contact you?</li>
      </ul>
    </div>
    <div class="chatbot-input">
      <input type="text" id="userInput" placeholder="Type your question..." />
      <button id="sendBtn">Send</button>
    </div>
  `;

  const sendBtn = chatbot.querySelector('#sendBtn');
  const userInput = chatbot.querySelector('#userInput');
  const chatLog = chatbot.querySelector('.chat-log');

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes('data') || msg.includes('analytics') || msg.includes('dashboard')) {
      return "I've worked on interactive dashboards, predictive modeling, and business reporting using tools like Excel, Power BI, and Python.";
    }

    if (msg.includes('web') || msg.includes('design') || msg.includes('website')) {
      return "I design and develop responsive websites using HTML, CSS, JavaScript, Bootstrap, and modern UI libraries.";
    }

    if (msg.includes('services') || msg.includes('offer') || msg.includes('provide')) {
      return "My services include Data Analysis, Web Development, Digital Marketing Strategy, Branding, and Photography.";
    }

    if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
      return "You can contact me via the form below or reach out on LinkedIn, WhatsApp, or Email — links are in the footer!";
    }

    return "🤖 Sorry, I didn't understand that. Please try rephrasing your question.";
  };

  const addToChat = (sender, text) => {
    chatLog.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  };

  const handleSend = () => {
    const question = userInput.value.trim();
    if (question) {
      addToChat('You', question);
      const response = getBotResponse(question);
      addToChat('Bot', response);
      userInput.value = '';
    }
  };

  sendBtn.addEventListener('click', handleSend);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});
