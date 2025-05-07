// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Função para revelar elementos ao rolar a página
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Ativar a função ao rolar a página
window.addEventListener('scroll', revealOnScroll);

// Executar uma vez quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll();
    
    // Adicionar classe à navbar ao rolar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Adicionar animação de entrada para elementos na tela inicial
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section p, .hero-section .btn, .hero-section .avatar-group');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, 300 * index);
    });
    
    // Inicializar animações para os cards de cursos
    initCourseCardAnimations();
    
    // Adicionar efeito de parallax para a seção hero
    initParallaxEffect();
    
    // Adicionar efeito de typing para o título principal
    if (document.querySelector('.hero-section h1 span')) {
        initTypingEffect();
    }
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Adicionar animação de sucesso
            this.classList.add('form-success');
            
            // Mostrar mensagem de sucesso com animação
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3 fade-in';
            successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
            this.appendChild(successMessage);
            
            // Reset do formulário após um delay
            setTimeout(() => {
                this.reset();
                this.classList.remove('form-success');
                // Remover a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
            }, 1000);
        } else {
            // Mostrar mensagem de erro com animação
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger mt-3 shake-animation';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Por favor, preencha todos os campos.';
            this.appendChild(errorMessage);
            
            // Destacar campos vazios
            const inputs = this.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (!input.value) {
                    input.classList.add('is-invalid', 'shake-animation');
                    setTimeout(() => {
                        input.classList.remove('shake-animation');
                    }, 500);
                }
            });
            
            // Remover mensagem de erro após 4 segundos
            setTimeout(() => {
                errorMessage.classList.add('fade-out');
                setTimeout(() => {
                    errorMessage.remove();
                }, 500);
            }, 4000);
        }
    });
    
    // Remover classe de erro ao digitar
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
}

// Add fade-in animation to sections when they come into view
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animar elementos dentro da seção
            const elementsToAnimate = entry.target.querySelectorAll('.animate-on-scroll');
            elementsToAnimate.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animated');
                }, 150 * index);
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Efeito avançado para os cards de cursos
function initCourseCardAnimations() {
    const courseCards = document.querySelectorAll('.curso-card');
    
    courseCards.forEach(card => {
        // Efeito de hover 3D
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calcular a rotação baseada na posição do mouse
            const rotateY = mouseX / 10;
            const rotateX = -mouseY / 10;
            
            // Aplicar transformação 3D
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // Efeito de luz
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = `translateX(${mouseX/10}px) translateY(${mouseY/10}px)`;
            }
        });

        // Resetar ao sair do card
        card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(0) translateY(0)';
        }
    });
        
        // Remover transição ao entrar para efeito suave
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'none';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transition = 'none';
            }
        });
    });
}

// Efeito de parallax para a seção hero
// ... existing code ...

// Função para efeito de parallax na seção hero
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Parallax para a imagem hero
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        // Parallax para o fundo da seção hero
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollY * 0.05}px`;
        }
    });
}

// Função para efeito de digitação no título principal
function initTypingEffect() {
    const textElement = document.querySelector('.hero-section h1 span');
    const text = textElement.textContent;
    textElement.textContent = '';
    
    let i = 0;
    const speed = 100; // velocidade da digitação em ms
    
    function typeWriter() {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Iniciar o efeito após um pequeno delay
    setTimeout(typeWriter, 1000);
}

// Adicionar contador de números para estatísticas
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = Math.ceil(target / (duration / 16)); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = current;
                requestAnimationFrame(updateCounter);
            }
        };
        
        // Iniciar contador quando o elemento estiver visível
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
}

// Inicializar contadores quando a página carregar
document.addEventListener('DOMContentLoaded', initCounters);

// Add active class to current navigation item
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            // Adicionar efeito de destaque para o link ativo
            link.classList.add('nav-link-active');
        } else {
            link.classList.remove('nav-link-active');
        }
    });
});

// Adicionar efeito de preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }
});