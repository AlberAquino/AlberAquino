// PeaceBridge Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Animated counters for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
            const suffix = counter.textContent.replace(/[0-9.]/g, '');
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animate hero stats when they come into view
                if (element.classList.contains('hero-stats')) {
                    animateCounters();
                }
                
                // Add fade-in animation class
                element.classList.add('animate-in');
                
                // Stop observing after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.mission-card, .story-card, .hero-stats, .connect-content');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Story carousel functionality
    const storyCards = [
        {
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
            title: '"From Strangers to Sisters"',
            content: '"Through PeaceBridge, I connected with Ahmed from Palestine. Despite our different backgrounds, we discovered our shared love for poetry. Now we collaborate on peace projects together."',
            authorName: 'Sarah Chen',
            authorLocation: 'San Francisco, USA'
        },
        {
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            title: '"Building Bridges Across Borders"',
            content: '"I never thought I could have a meaningful conversation with someone from a conflicted region. PeaceBridge showed me that we all share the same hopes for our children."',
            authorName: 'Marcus Johnson',
            authorLocation: 'London, UK'
        },
        {
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
            title: '"Understanding Through Technology"',
            content: '"The AI translation helped me communicate with a grandmother from rural China. Her wisdom about peace became a source of inspiration for my community work."',
            authorName: 'Priya Sharma',
            authorLocation: 'Mumbai, India'
        }
    ];

    let currentStoryIndex = 0;
    const storyCard = document.querySelector('.story-card');
    const navDots = document.querySelectorAll('.nav-dot');

    function updateStoryCard(index) {
        const story = storyCards[index];
        
        if (storyCard) {
            storyCard.innerHTML = `
                <div class="story-image">
                    <img src="${story.image}" alt="${story.authorName}">
                </div>
                <div class="story-content">
                    <h3>${story.title}</h3>
                    <p>${story.content}</p>
                    <div class="story-author">
                        <span class="author-name">${story.authorName}</span>
                        <span class="author-location">${story.authorLocation}</span>
                    </div>
                </div>
            `;
        }

        // Update navigation dots
        navDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Auto-rotate stories
    function rotateStories() {
        currentStoryIndex = (currentStoryIndex + 1) % storyCards.length;
        updateStoryCard(currentStoryIndex);
    }

    // Manual story navigation
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentStoryIndex = index;
            updateStoryCard(currentStoryIndex);
        });
    });

    // Start story rotation
    setInterval(rotateStories, 5000);

    // Form handling with validation
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const region = formData.get('region') || this.querySelector('select').value;
            const commitment = this.querySelector('input[type="checkbox"]').checked;
            
            // Basic validation
            if (!name || !email || !region || !commitment) {
                showFormMessage('Please fill in all fields and accept the commitment.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Welcome to PeaceBridge! Check your email for next steps.', 'success');
            this.reset();
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            text-align: center;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        signupForm.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add dynamic peace animations
    function createPeaceParticle() {
        const symbols = ['🕊️', '☮️', '💙', '🌍', '🤝'];
        const particle = document.createElement('div');
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.7;
            animation: floatUp 4s ease-out forwards;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 4000);
    }

    // Add CSS animation for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Create peace particles periodically
    setInterval(createPeaceParticle, 3000);

    // Button hover effects with ripple
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Smooth scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--peace-gradient);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize any additional features
    console.log('PeaceBridge initialized successfully! 🕊️');
});