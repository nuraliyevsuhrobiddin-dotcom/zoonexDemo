/**
 * ZOONEX MARKET - Investor Ready JavaScript
 * Professional Presentation Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // MOBILE MENU
    // ====================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navLinks.classList.contains('mobile-active');
            
            if (isOpen) {
                navLinks.classList.remove('mobile-active');
                navLinks.style.display = 'none';
                mobileMenuBtn.textContent = '☰';
            } else {
                navLinks.classList.add('mobile-active');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '999';
                mobileMenuBtn.textContent = '✕';
            }
        });
    }

    // ====================
    // SCROLL ANIMATIONS
    // ====================
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initial check
    handleScrollAnimation();
    
    // Throttled scroll listener
    let throttleTimer;
    window.addEventListener('scroll', () => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
            handleScrollAnimation();
            throttleTimer = null;
        }, 100);
    });

    // ====================
    // SMOOTH SCROLL FOR NAV LINKS
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('mobile-active')) {
                    navLinks.classList.remove('mobile-active');
                    navLinks.style.display = 'none';
                    if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
                }
            }
        });
    });

    // ====================
    // CHATBOT - INVESTOR READY
    // ====================
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const questionBtns = document.querySelectorAll('.question-btn');
    
    // Investor-focused chatbot responses in Uzbek
    const chatbotResponses = {
        'Zoonex Market nima?': 'Zoonex Market — O\'zbekistondagi eng yirik chorvachilik raqamli bozori. $2.4 milliardlik bozorni raqamlashtirish maqsadida yaratilgan B2B marketplace + Academy + Logistics ekosistemasi. Loyiha 2026 yil boshida ishga tushdi.',
        
        'Muammo nimada?': 'Chorvachilik sohasida 3 asosiy muammo: 1) Fermerlar 3-5 kun vaqtini jismoniy bozorga sarflashadi, 2) 90% savdo offline - tanlov cheklangan, 3) 30% tranzaksiyada ishonch muammosi.',
        
        'Qanday ishlaydi?': '3 oddiy qadam: 1) Telefon orqali 2 daqiqada ro\'yxatdan o\'ting, 2) Video/rasm orqali e\'lon joylang, 3) Xavfsiz to\'lov va yetkazib berish orqali soting.',
        
        'Video yuklash bormi?': 'Ha! Platformada 360° video ko\'rish imkoniyati mavjud. Bu sotib oluvchilarga hayvonni yaxshiroq baholashga yordam beradi va sotuvlar 40% oshishi kutilmoqda.',
        
        'AI bormi?': 'Ha! AI yordamida: 1) Hayvon narxini avtomatik baholash, 2) Sog\'liq holatini tahlil qilish, 3) Eng mos xaridorlarni topish. 2027 yildan ishga tushadi.',
        
        'Demo qayerda?': 'To\'liq investor demo sahifamiz: zoonex.uz/demo.html — Pitch deck, moliyaviy model, bozor tahlili va aloqa ma\'lumotlari.',
        
        'Bozor hajmi qancha?': 'TAM: $2.4B (O\'zbekiston chorvachilik bozori), SAM: $480M (onlayn o\'ta oladigan segment), SOM: $48M (3 yil ichida 10% egallash maqsadi). CAGR: 25%.',
        
        'Investitsiya so\'rovi?': 'Seed round: $500,000. Pre-money valuation: $2.5M. Equity: 20%. 18 oylik runway. 3 ta platforma quriladi: Marketplace + Academy + Logistics.',
        
        'Jamoa kimlardan iborat?': '2 nafar founder: CEO/CTO (Nuraliyev Suhrobiddin - 5+ yil tech) va Agro Lead (G\'aniyev Timur - 15+ yil agro). Hozirda 3 ta developer qidirilmoqda.',
        
        'Monetizatsiya?': '3 asosiy oqim: 1) Marketplace 5% komissiya, 2) Logistics yetkazish xizmati, 3) Academy kurs sotuvlari. 2028 yilga kelib $4.8M tushum maqsadi.',
        
        'Aloqa?': 'Investitsiya takliflari uchun: Tel: +998 99 777 70 31, Telegram: @nuraliyev1s, Email: nuraliyevsuhrobiddin@gmail.com, Manzil: Toshkent, Uzbekistan.'
    };
    
    function toggleChatbot() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            // Scroll to bottom of messages
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }
    
    function addMessage(text, isUser = false) {
        const message = document.createElement('div');
        message.className = `message ${isUser ? 'user' : 'bot'}`;
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function handleQuestion(question) {
        // Add user message
        addMessage(question, true);
        
        // Simulate typing delay
        setTimeout(() => {
            const response = chatbotResponses[question] || 'Kechirasiz, bu savolga javob topa olmadim. Iltimos, investors@zoonex.uz manziliga yozing.';
            addMessage(response);
        }, 500);
    }
    
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChatbot);
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', toggleChatbot);
    }
    
    questionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            handleQuestion(question);
        });
    });

    // ====================
    // NAVBAR BACKGROUND ON SCROLL
    // ====================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ====================
    // STATS COUNTER ANIMATION
    // ====================
    function animateCounter(element, target, duration = 2000, suffix = '') {
        let start = 0;
        const isMoney = target.toString().includes('$');
        const numericTarget = parseInt(target.toString().replace(/[^0-9]/g, ''));
        const increment = numericTarget / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < numericTarget) {
                if (isMoney) {
                    element.textContent = '$' + Math.floor(start) + 'K' + suffix;
                } else {
                    element.textContent = Math.floor(start) + suffix;
                }
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        updateCounter();
    }
    
    // Trigger counter animation when hero is visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        if (text.includes('$')) {
                            stat.textContent = '0';
                            setTimeout(() => {
                                stat.textContent = '$125K';
                            }, 500);
                        } else if (text.includes('+')) {
                            const num = parseInt(text);
                            stat.textContent = '0';
                            animateCounter(stat, num, 2000, '+');
                        } else {
                            const num = parseInt(text);
                            stat.textContent = '0';
                            animateCounter(stat, num, 2000, '');
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroStats);
    }

    // ====================
    // CONTACT FORM HANDLING
    // ====================
    const investorForm = document.getElementById('investorForm');
    
    if (investorForm) {
        investorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            const submitBtn = investorForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Yuborilmoqda...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Xabaringiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.', 'success');
                investorForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ====================
    // NOTIFICATION SYSTEM
    // ====================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#0ea5e9'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation keyframes if not exists
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // ====================
    // KEYBOARD SHORTCUTS
    // ====================
    document.addEventListener('keydown', (e) => {
        // ESC to close chatbot
        if (e.key === 'Escape' && chatbotWindow && chatbotWindow.classList.contains('active')) {
            chatbotWindow.classList.remove('active');
        }
    });

    // ====================
    // DESPATCH LOGISTICS TRACKING DEMO
    // ====================
    const trackBtn = document.getElementById('trackBtn');
    const trackingInput = document.getElementById('trackingInput');
    const trackingResult = document.getElementById('trackingResult');
    
    if (trackBtn && trackingInput && trackingResult) {
        trackBtn.addEventListener('click', function() {
            const trackingNumber = trackingInput.value.trim();
            
            if (!trackingNumber) {
                showNotification('Iltimos, tracking raqamini kiriting!', 'error');
                return;
            }
            
            // Simulate loading
            trackBtn.textContent = 'Qidirilmoqda...';
            trackBtn.disabled = true;
            
            setTimeout(() => {
                // Show result with animation
                trackingResult.classList.add('active');
                showNotification(`Buyurtma ${trackingNumber} topildi!`, 'success');
                
                trackBtn.textContent = 'Kuzatish';
                trackBtn.disabled = false;
                
                // Scroll to result
                trackingResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1500);
        });
        
        // Enter key support
        trackingInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                trackBtn.click();
            }
        });
    }

    // ====================
    // ECOSYSTEM CARDS ANIMATION
    // ====================
    const ecosystemCards = document.querySelectorAll('.ecosystem-card');
    
    ecosystemCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // ====================
    // COURSE CARDS HOVER EFFECT
    // ====================
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ====================
    // NAVBAR SMOOTH SHOW/HIDE ON SCROLL
    // ====================
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });

    console.log('🐄 Zoonex Market — Investor Ready Website Loaded!');
    console.log('🎓 Academy + 🚛 Logistics added!');
    console.log('📧 Contact: investors@zoonex.uz');
});
