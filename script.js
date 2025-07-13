 
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

        // Enhanced AI Chatbot Logic
        document.addEventListener("DOMContentLoaded", () => {
            const chatbot = document.getElementById('chatbot');
            const chatbotBody = chatbot.querySelector('.chatbot-body');
            const chatbotHeader = chatbot.querySelector('.chatbot-header');
            const sendBtn = chatbot.querySelector('#sendBtn');
            const userInput = chatbot.querySelector('#userInput');
            const chatLog = chatbot.querySelector('.chat-log');
            const typingIndicator = chatbot.querySelector('.typing-indicator');
            const suggestionChips = chatbot.querySelectorAll('.suggestion-chip');

            // Toggle chatbot visibility
            chatbotHeader.addEventListener('click', () => {
                chatbot.classList.toggle('active');
            });

            // Handle suggestion chips
            suggestionChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    const question = chip.textContent;
                    userInput.value = question;
                    handleSend();
                });
            });

            // Enhanced responses with more context
            const getBotResponse = async (message) => {
                const msg = message.toLowerCase();
                
                // Simulate AI thinking time
                showTypingIndicator();
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
                hideTypingIndicator();

                // Portfolio-specific responses
                if (msg.includes('data') || msg.includes('analytics') || msg.includes('dashboard')) {
                    return "🔍 I specialize in transforming complex data into actionable insights! My expertise includes:\n\n• Interactive dashboards with Power BI & Tableau\n• Predictive analytics using Python & R\n• Business intelligence reporting\n• Data visualization and storytelling\n• Statistical analysis and modeling\n\nI've completed 10+ projects helping businesses make data-driven decisions. Would you like to see some examples?";
                }

                if (msg.includes('web') || msg.includes('website') || msg.includes('development')) {
                    return "💻 I create modern, responsive websites that deliver exceptional user experiences!\n\n• Full-stack web development (React, Node.js)\n• Responsive design for all devices\n• E-commerce solutions\n• API development & integration\n• Performance optimization\n• SEO-friendly architecture\n\nI use cutting-edge technologies to build scalable web applications. Ready to discuss your project?";
                }

                if (msg.includes('design') || msg.includes('ui') || msg.includes('ux')) {
                    return "🎨 I craft intuitive user experiences that users love!\n\n• User research & persona development\n• Wireframing & prototyping\n• Interactive design systems\n• Accessibility compliance (WCAG)\n• Usability testing & optimization\n• Brand identity design\n\nI use tools like Figma, Adobe XD, and Sketch to create designs that are both beautiful and functional. Want to see my design process?";
                }

                if (msg.includes('marketing') || msg.includes('digital') || msg.includes('seo')) {
                    return "📈 I help businesses grow their online presence through strategic digital marketing!\n\n• SEO optimization & keyword research\n• Social media strategy & management\n• Content marketing campaigns\n• PPC advertising (Google Ads, Facebook)\n• Email marketing automation\n• Analytics & performance tracking\n\nI've helped clients increase their online visibility by 300%+ on average. Let's discuss your marketing goals!";
                }

                if (msg.includes('ai') || msg.includes('machine learning') || msg.includes('artificial')) {
                    return "🤖 I develop intelligent AI solutions that automate and optimize business processes!\n\n• Custom AI model development\n• Natural Language Processing (NLP)\n• Computer vision applications\n• Predictive analytics & forecasting\n• Chatbots & virtual assistants\n• Process automation\n\nUsing TensorFlow, PyTorch, and OpenAI APIs, I create AI solutions that deliver real business value. Interested in AI for your business?";
                }

                if (msg.includes('services') || msg.includes('offer') || msg.includes('provide')) {
                    return "🚀 I offer comprehensive digital solutions across multiple domains:\n\n🔹 *Data Analytics & BI* - Transform data into insights\n🔹 *Web Development* - Modern, responsive applications\n🔹 *UI/UX Design* - User-centered design solutions\n🔹 *Digital Marketing* - Strategic online growth\n🔹 *AI Solutions* - Intelligent automation\n🔹 *Technology Consulting* - Strategic guidance\n\nWith 3+ years of experience and 10+ completed projects, I provide end-to-end digital solutions. What area interests you most?";
                }

                if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone')) {
                    return "📞 I'd love to connect with you! Here are the best ways to reach me:\n\n• *Email: kimbidenis67@gmail.com\n• **LinkedIn: linkedin.com/in/kimbidenis\n• **WhatsApp: +237 676 642 108\n• **GitHub*: github.com/kimbi12/KIMBI-DENIS\n\nFeel free to reach out through any channel that works best for you. I typically respond within 24 hours. Looking forward to discussing your project!";
                }

                if (msg.includes('experience') || msg.includes('background') || msg.includes('about')) {
                    return "👨‍💻 I'm Denis, a passionate Frontend Developer with 3+ years of experience in creating digital solutions!\n\n*My Journey:\n• Started as a web developer, expanded into data analytics\n• Completed 10+ successful projects\n• Mastered 8+ professional tools\n• Specialized in combining creativity with technical expertise\n\nWhat drives me:*\nI love solving complex problems and turning ideas into reality. Whether it's building a stunning website or uncovering insights from data, I'm committed to delivering excellence.\n\nWhat would you like to know more about?";
                }

                if (msg.includes('price') || msg.includes('cost') || msg.includes('budget')) {
                    return "💰 Project pricing depends on scope and complexity. Here's a general overview:\n\n• *Web Development: $500 - $5000+\n• **Data Analytics: $300 - $2000+\n• **UI/UX Design: $400 - $3000+\n• **Digital Marketing: $200 - $1500+/month\n• **AI Solutions*: $800 - $8000+\n\nI offer:\n✅ Free initial consultation\n✅ Detailed project quotes\n✅ Flexible payment plans\n✅ Rush delivery options\n\nLet's discuss your specific needs for an accurate quote!";
                }

                if (msg.includes('timeline') || msg.includes('delivery') || msg.includes('deadline')) {
                    return "⏱ Project timelines vary based on complexity:\n\n• *Web Development: 3-8 weeks\n• **Data Analytics: 2-6 weeks\n• **UI/UX Design: 2-5 weeks\n• **Digital Marketing: Ongoing campaigns\n• **AI Solutions: 4-12 weeks\n\nRush options available:*\n• 48-hour delivery for urgent projects\n• Weekend and evening work\n• Dedicated project management\n\nI always provide realistic timelines and keep you updated throughout the process. What's your target deadline?";
                }

                // AI API Integration placeholder
                if (msg.includes('api') || msg.includes('integrate') || msg.includes('openai')) {
                    return await callAIAPI(message);
                }

                // Fallback responses
                const fallbackResponses = [
                    "🤔 That's an interesting question! Could you provide more details so I can give you a better answer?",
                    "💭 I'm not sure I fully understand. Could you rephrase that? I'm here to help with questions about Denis's services, experience, or projects.",
                    "🔍 I'd love to help! Try asking about specific services like web development, data analytics, or digital marketing.",
                    "🎯 Let me help you better! You can ask about projects, pricing, timelines, or how to get started with a service."
                ];

                return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            };

            // AI API Integration (placeholder for real implementation)
            const callAIAPI = async (message) => {
                try {
                    // Replace with actual AI API call
                    // Example: OpenAI, Claude, or other AI services
                    
                    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Authorization': 'Bearer YOUR_API_KEY',
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({
                    //         model: 'gpt-3.5-turbo',
                    //         messages: [
                    //             {
                    //                 role: 'system',
                    //                 content: 'You are Denis\' AI assistant. Help users learn about his services in web development, data analytics, UI/UX design, digital marketing, and AI solutions.'
                    //             },
                    //             {
                    //                 role: 'user',
                    //                 content: message
                    //             }
                    //         ],
                    //         max_tokens: 300,
                    //         temperature: 0.7
                    //     })
                    // });
                    
                    // const data = await response.json();
                    // return data.choices[0].message.content;
                   // For now, return a placeholder response
                    return "🤖 AI API integration is ready! To connect with services like OpenAI, Claude, or other AI providers, you'll need to:\n\n1. Get an API key from your chosen provider\n2. Replace the placeholder API call in the code\n3. Configure your endpoints and authentication\n\nThis chatbot is designed to work with any AI API. Would you like help setting up a specific service?";
                    
                } catch (error) {
                    console.error('AI API Error:', error);
                    return "⚠ I'm having trouble connecting to the AI service right now. Please try again later or contact Denis directly for immediate assistance.";
                }
            };

            // Show typing indicator
            const showTypingIndicator = () => {
                typingIndicator.classList.add('show');
                chatLog.scrollTop = chatLog.scrollHeight;
            };

            // Hide typing indicator
            const hideTypingIndicator = () => {
                typingIndicator.classList.remove('show');
            };

            // Add message to chat
            const addMessage = (sender, text, isUser = false) => {
                const messageDiv = document.createElement('div');
                `messageDiv.className = message ${isUser ? 'user' : 'bot'}`;
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.innerHTML = text.replace(/\n/g, '<br>');
                
                messageDiv.appendChild(messageContent);
                
                // Remove welcome message if it exists
                const welcomeMessage = chatLog.querySelector('.welcome-message');
                if (welcomeMessage) {
                    welcomeMessage.remove();
                }
                
                chatLog.appendChild(messageDiv);
                chatLog.scrollTop = chatLog.scrollHeight;
            };

            // Handle sending messages
            const handleSend = async () => {
                const question = userInput.value.trim();
                if (!question) return;

                // Disable input while processing
                userInput.disabled = true;
                sendBtn.disabled = true;

                // Add user message
                addMessage('user', question, true);
                userInput.value = '';

                try {
                    // Get bot response
                    const response = await getBotResponse(question);
                    addMessage('bot', response, false);
                } catch (error) {
                    addMessage('bot', '⚠ Sorry, I encountered an error. Please try again or contact Denis directly.', false);
                }

                // Re-enable input
                userInput.disabled = false;
                sendBtn.disabled = false;
                userInput.focus();
            };

            // Event listeners
            sendBtn.addEventListener('click', handleSend);
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            });

            // Auto-focus input when chatbot opens
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (chatbot.classList.contains('active')) {
                            setTimeout(() => userInput.focus(), 100);
                        }
                    }
                });
            });

            observer.observe(chatbot, { attributes: true });
        });
