// Floating particles for Hero Highlights background
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('heroFloat');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  const particles = [];
  const mouse = { x: 0, y: 0 };

  // Resize handler
  window.addEventListener('resize', () => {
    rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  });

  // Mouse move
  canvas.addEventListener('mousemove', (e) => {
    const bounds = canvas.getBoundingClientRect();
    mouse.x = e.clientX - bounds.left;
    mouse.y = e.clientY - bounds.top;
  });

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 30 + 20;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.targetX = this.x;
      this.targetY = this.y;
    }

    update() {
      // Lerp to mouse
      this.targetX = mouse.x + (Math.random() - 0.5) * 200;
      this.targetY = mouse.y + (Math.random() - 0.5) * 200;
      this.x += (this.targetX - this.x) * 0.05;
      this.y += (this.targetY - this.y) * 0.05;
      this.size += (Math.sin(Date.now() * 0.005 + this.x) * 0.5);
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowColor = 'rgba(255,255,255,0.6)';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Init particles
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});

