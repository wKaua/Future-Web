const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
const heroText = document.querySelector(".hero h1");
const carouselTrack = document.querySelector(".carousel-track");
    

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Particle Class
class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
}

// Initialize Particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = "rgba(0, 212, 255, 0.8)";
        const speedX = (Math.random() - 0.5) * 1.5;
        const speedY = (Math.random() - 0.5) * 1.5;
        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

// Animate Particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Resize Canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Initialize and Animate
initParticles();
animateParticles();

// Typing Effect with Infinite Loop
let text = heroText.textContent;
heroText.textContent = "";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 100); // Typing speed
    } else {
        setTimeout(() => {
            heroText.textContent = ""; // Clear text
            i = 0; // Reset index
            typeEffect(); // Restart the effect
        }, 1000); // Pause before restarting
    }
}

window.addEventListener("load", typeEffect);

// Smooth Scroll Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth" });
    });
});


// Preenchendo o carrossel dinamicamente
technologies.forEach(tech => {
  const span = document.createElement("span");
  span.textContent = tech;
  carouselTrack.appendChild(span);
});

// Duplicar itens para loop suave
const clone = carouselTrack.cloneNode(true);
carouselTrack.parentElement.appendChild(clone);