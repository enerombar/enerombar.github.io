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

  // Fondo animado: nodos conectados (red matemática/informática)
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

    // Configuración de nodos
    const NODE_COUNT = 48;
    const NODES = [];
    const COLORS = ['#00eaff', '#2575fc', '#00bcd4', '#fff'];
    const LINE_COLOR = '#00eaff';
    const LINE_OPACITY = 0.18;
    const MAX_DIST = 180;

    function randomBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      NODES.push({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: randomBetween(-0.7, 0.7),
        vy: randomBetween(-0.7, 0.7),
        r: randomBetween(2.5, 5.5),
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Dibujar líneas entre nodos cercanos
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const a = NODES[i], b = NODES[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / MAX_DIST) * LINE_OPACITY;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Dibujar nodos
      for (let node of NODES) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.restore();
      }
    }

    function update() {
      for (let node of NODES) {
        node.x += node.vx;
        node.y += node.vy;

        // Rebote en los bordes
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    }

    function animate() {
      update();
      draw();
      requestAnimationFrame(animate);
    }
    animate();
  }
});
