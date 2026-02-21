// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (document.body.classList.contains('light-theme')) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    }
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLightTheme = document.body.classList.contains('light-theme');
    
    // Update icon
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    // Save theme preference
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Skills animation
const skills = document.querySelectorAll('.skill-item');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

skills.forEach(skill => observer.observe(skill));

// --- Contact Form Integration ---
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get current timestamp
            const now = new Date();
            const timestamp = now.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            // Format the subject with timestamp
            const originalSubject = contactForm.subject.value;
            const formattedSubject = `Portfolio Website Outreach: (${timestamp})`;
            
            // Format the message with structured content
            const originalMessage = contactForm.message.value;
            const structuredMessage = `Name: ${contactForm.name.value}\nSubject: ${originalSubject}\nEmail: ${contactForm.email.value}\nMessage: ${originalMessage}`;
            
            // Create hidden fields for Formspree
            const subjectField = document.createElement('input');
            subjectField.type = 'hidden';
            subjectField.name = '_subject';
            subjectField.value = formattedSubject;
            
            const messageField = document.createElement('input');
            messageField.type = 'hidden';
            messageField.name = '_message';
            messageField.value = structuredMessage;
            
            // Add the hidden fields to the form
            contactForm.appendChild(subjectField);
            contactForm.appendChild(messageField);
            
            // Submit the form
            contactForm.submit();
            
            // Show success message
            contactSuccess.style.display = 'block';
            contactSuccess.style.color = 'var(--secondary-color)';
            contactSuccess.textContent = 'Thank you! Your message has been sent.';
            contactForm.reset();
        });
    }
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add typing effect to hero subtitle
const heroSubtitle = document.querySelector('.hero h2');
const text = heroSubtitle.textContent;
heroSubtitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing effect when page loads
typeWriter();

// --- Skills Tab Toggle for About Page ---
document.addEventListener('DOMContentLoaded', function() {
    const skillsTabs = document.querySelectorAll('.skills-tab');
    const skillsContents = document.querySelectorAll('.skills-tab-content');
    if (skillsTabs.length && skillsContents.length) {
        skillsTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                skillsTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const selected = tab.getAttribute('data-tab');
                skillsContents.forEach(content => {
                    if (content.id === `skills-${selected}`) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
});

// Add skill level visualization
function createSkillLevel(level) {
    const container = document.createElement('div');
    container.className = 'skill-level';
    
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('div');
        dot.className = 'skill-dot';
        if (i < level) {
            dot.classList.add('active');
        }
        container.appendChild(dot);
    }
    
    return container;
}

// Example of how to add a skill
function addSkill(name, level, category) {
    const skillGrid = document.querySelector(`.skill-category[data-category="${category}"] .skill-grid`);
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';

    // Map level to text
    let levelText = '';
    switch(level) {
        case 5: levelText = 'Advanced'; break;
        case 4: levelText = 'Intermediate'; break;
        case 3: levelText = 'Proficient'; break;
        case 2: levelText = 'Beginner'; break;
        case 1: levelText = 'Novice'; break;
        default: levelText = '';
    }

    skillItem.innerHTML = `
        <span class="skill-level">${levelText}</span>
        <h4>${name}</h4>
        ${createSkillLevel(level).outerHTML}
    `;

    skillGrid.appendChild(skillItem);
}

// Example of how to add a project
function addProject(title, description, category, imageUrl, link) {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-category', category);
    
    projectCard.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <div class="project-content">
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${link}" class="btn secondary" target="_blank">View Project</a>
        </div>
    `;
    
    projectsGrid.appendChild(projectCard);
}

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.section-title, .skill-item, .project-card');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => revealOnScroll.observe(element)); 

// Particle and FlyingMan animation for about page
(function() {
    const colors = ['#00c6fb', '#ff7e5f', '#43e97b', '#f9d423']; // blue, orange, green, gold
    const flyingManSrc = 'images/FlyingMan.png';
    const NUM_PARTICLES = 32;
    const FLYING_INTERVAL = 5000 + Math.random() * 5000; // 5-10s
    let particles = [];
    let flyingMan = null;
    let flyingManActive = false;
    let lastFlyingTime = 0;

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createParticle(w, h) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = randomBetween(0.2, 0.7);
        return {
            x: randomBetween(0, w),
            y: randomBetween(0, h),
            r: randomBetween(2, 5),
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: randomBetween(0.5, 1)
        };
    }

    function drawParticles(ctx, w, h) {
        for (let p of particles) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.restore();
        }
    }

    function updateParticles(w, h) {
        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            // Bounce off edges
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
        }
    }

    function spawnFlyingMan(w, h) {
        // Randomly pick a direction: left->right, right->left, top->bottom, bottom->top
        const directions = ['lr', 'rl', 'tb', 'bt'];
        const dir = directions[Math.floor(Math.random() * directions.length)];
        let x, y, vx, vy, angle;
        const speed = randomBetween(2, 4);
        if (dir === 'lr') {
            x = -80; y = randomBetween(0, h-80); vx = speed; vy = 0; angle = 0;
        } else if (dir === 'rl') {
            x = w+80; y = randomBetween(0, h-80); vx = -speed; vy = 0; angle = Math.PI;
        } else if (dir === 'tb') {
            x = randomBetween(0, w-80); y = -80; vx = 0; vy = speed; angle = Math.PI/2;
        } else {
            x = randomBetween(0, w-80); y = h+80; vx = 0; vy = -speed; angle = -Math.PI/2;
        }
        flyingMan = { x, y, vx, vy, angle, alpha: 0, state: 'fadein', t: 0, dir };
        flyingManActive = true;
    }

    function drawFlyingMan(ctx, w, h, img) {
        if (!flyingMan) return;
        ctx.save();
        ctx.globalAlpha = flyingMan.alpha;
        ctx.translate(flyingMan.x+80, flyingMan.y+80);
        ctx.rotate(flyingMan.angle);
        ctx.drawImage(img, -80, -80, 160, 160);
        ctx.restore();
    }

    function updateFlyingMan(w, h) {
        if (!flyingMan) return;
        flyingMan.x += flyingMan.vx;
        flyingMan.y += flyingMan.vy;
        flyingMan.t++;
        // Fade in/out
        if (flyingMan.state === 'fadein') {
            flyingMan.alpha += 0.04;
            if (flyingMan.alpha >= 1) flyingMan.state = 'fly';
        } else if (flyingMan.state === 'fly') {
            // Check if fully off screen in the direction of travel
            if (
                (flyingMan.dir === 'lr' && flyingMan.x > w+100) ||
                (flyingMan.dir === 'rl' && flyingMan.x < -100) ||
                (flyingMan.dir === 'tb' && flyingMan.y > h+100) ||
                (flyingMan.dir === 'bt' && flyingMan.y < -100)
            ) {
                flyingMan.state = 'fadeout';
            }
        } else if (flyingMan.state === 'fadeout') {
            flyingMan.alpha -= 0.04;
            if (flyingMan.alpha <= 0) flyingManActive = false;
        }
    }

    function animate() {
        const bg = document.getElementById('particle-bg');
        if (!bg) return;
        let w = bg.offsetWidth, h = bg.offsetHeight;
        if (!bg.canvas) {
            bg.innerHTML = '';
            let canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.display = 'block';
            canvas.style.position = 'absolute';
            canvas.style.top = 0;
            canvas.style.left = 0;
            bg.appendChild(canvas);
            bg.canvas = canvas;
            particles = Array.from({length: NUM_PARTICLES}, () => createParticle(w, h));
            bg.flyingManImg = new window.Image();
            bg.flyingManImg.src = flyingManSrc;
        }
        let canvas = bg.canvas;
        let ctx = canvas.getContext('2d');
        // Resize if needed
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w; canvas.height = h;
        }
        ctx.clearRect(0, 0, w, h);
        updateParticles(w, h);
        drawParticles(ctx, w, h);
        // FlyingMan
        if (!flyingManActive && Date.now() - lastFlyingTime > FLYING_INTERVAL) {
            spawnFlyingMan(w, h);
            lastFlyingTime = Date.now();
        }
        if (flyingManActive && bg.flyingManImg.complete) {
            updateFlyingMan(w, h);
            drawFlyingMan(ctx, w, h, bg.flyingManImg);
            if (flyingMan && (flyingMan.x < -100 || flyingMan.x > w+100 || flyingMan.y < -100 || flyingMan.y > h+100 || flyingMan.alpha <= 0)) {
                flyingManActive = false;
                flyingMan = null;
            }
        }
        requestAnimationFrame(animate);
    }
    if (document.getElementById('particle-bg')) {
        animate();
        window.addEventListener('resize', () => {
            const bg = document.getElementById('particle-bg');
            if (bg && bg.canvas) {
                bg.canvas.width = bg.offsetWidth;
                bg.canvas.height = bg.offsetHeight;
            }
        });
    }
})(); 