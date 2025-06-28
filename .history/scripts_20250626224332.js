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

  // Fondo animado: ondas + aurora + partículas luminosas
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

    // Ondas aurora
    const auroraWaves = [
      { amplitude: 90, frequency: 0.004, speed: 0.012, color: "#00eaff", phase: 0, alpha: 0.13 },
      { amplitude: 60, frequency: 0.006, speed: 0.018, color: "#2575fc", phase: Math.PI / 3, alpha: 0.10 },
      { amplitude: 40, frequency: 0.008, speed: 0.021, color: "#00bcd4", phase: Math.PI / 2, alpha: 0.09 }
    ];

    // Ondas finas
    const waves = [
      { amplitude: 40, frequency: 0.008, speed: 0.015, color: "#00eaff", phase: 0 },
      { amplitude: 28, frequency: 0.012, speed: 0.022, color: "#2575fc", phase: Math.PI / 2 },
      { amplitude: 18, frequency: 0.018, speed: 0.018, color: "#00bcd4", phase: Math.PI },
      { amplitude: 12, frequency: 0.024, speed: 0.025, color: "#fff", phase: Math.PI / 3 }
    ];

    // Partículas luminosas
    const PARTICLE_COUNT = 32;
    const PARTICLES = [];
    const PARTICLE_COLORS = ['#00eaff', '#2575fc', '#00bcd4', '#fff'];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      PARTICLES.push({
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        amplitude: 40 + Math.random() * 80,
        freq: 0.002 + Math.random() * 0.004,
        speed: 0.5 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        size: 2.5 + Math.random() * 2.5
      });
    }

    function drawAurora(time) {
      for (let i = 0; i < auroraWaves.length; i++) {
        const wave = auroraWaves[i];
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const y =
            height / 2 +
            wave.amplitude *
              Math.sin(
                wave.frequency * (x + wave.phase * 100) +
                  time * wave.speed * 2 * Math.PI
              );
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.alpha;
        ctx.lineWidth = 60 - i * 18;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 60 - i * 15;
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawWaves(time) {
      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i];
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const y =
            height / 2 +
            wave.amplitude *
              Math.sin(
                wave.frequency * (x + wave.phase * 100) +
                  time * wave.speed * 2 * Math.PI
              );
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = 0.45 + 0.15 * i;
        ctx.lineWidth = 2 + i;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawParticles(time) {
      for (let p of PARTICLES) {
        const x = p.baseX + p.amplitude * Math.sin(time * p.freq + p.phase);
        const y = p.baseY + p.amplitude * Math.cos(time * p.freq * 1.2 + p.phase);
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
      }
    }

    function animate(time) {
      ctx.clearRect(0, 0, width, height);
      drawAurora(time * 0.001);
      drawWaves(time * 0.001);
      drawParticles(time * 0.002);
      requestAnimationFrame(animate);
    }
    animate(0);
  }
});
