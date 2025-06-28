// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if(window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Contact floating button scroll to contact section
  const contactBtn = document.getElementById('contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Fondo animado: burbujas en canvas
  const canvas = document.getElementById('background-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    // Configuración de burbujas
    const bubbles = [];
    const colors = ['#00eaff', '#2575fc', '#00bcd4', '#fff'];
    const bubbleCount = 40;

    function randomBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        r: randomBetween(10, 40),
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: randomBetween(0.5, 2),
        alpha: randomBetween(0.2, 0.7),
        drift: randomBetween(-0.5, 0.5)
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let b of bubbles) {
        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();

        b.y -= b.speed;
        b.x += b.drift;
        if (b.y + b.r < 0) {
          b.y = height + b.r;
          b.x = randomBetween(0, width);
        }
        if (b.x - b.r > width) b.x = -b.r;
        if (b.x + b.r < 0) b.x = width + b.r;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
});
