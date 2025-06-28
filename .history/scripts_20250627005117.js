// Ocultar pantalla de carga al cargar la página
window.addEventListener('load', function() {
  setTimeout(() => {
    const loading = document.getElementById('loading-screen');
    if (loading) loading.classList.add('hide');
  }, 600);
});

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

  // Fondo animado: ondas + aurora + partículas luminosas (trayectorias suaves)
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

    // Partículas luminosas en trayectorias suaves horizontales
    const PARTICLE_COUNT = 24;
    const PARTICLES = [];
    const PARTICLE_COLORS = ['#00eaff', '#2575fc', '#00bcd4', '#fff', '#ff00cc', '#00ff99'];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      PARTICLES.push({
        baseY: Math.random() * height,
        amplitude: 30 + Math.random() * 60,
        freq: 0.001 + Math.random() * 0.0015,
        speed: 0.15 + Math.random() * 0.12,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)], // Fijar color al crear
        size: 2.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        offset: Math.random() * width
      });
    }

    // Túnel fractal animado
    function drawTunnel(time) {
      const cx = width / 2;
      const cy = height / 2;
      const rings = 12;
      const points = 32;
      for (let r = 0; r < rings; r++) {
        const radius = (Math.min(width, height) / 2.2) * (r + 1) / rings;
        ctx.save();
        ctx.beginPath();
        for (let p = 0; p <= points; p++) {
          const angle = (p / points) * Math.PI * 2;
          // Efecto fractal y rotación
          const wave = Math.sin(angle * (2 + r * 0.5) + time * 0.7 + r) * 12;
          const x = cx + Math.cos(angle + time * 0.08 + r * 0.1) * (radius + wave);
          const y = cy + Math.sin(angle + time * 0.08 + r * 0.1) * (radius + wave);
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0,188,212,${0.10 + 0.08 * Math.sin(time * 0.5 + r)})`;
        ctx.shadowColor = "#00eaff";
        ctx.shadowBlur = 18 - r;
        ctx.lineWidth = 2 + 1.5 * Math.sin(time * 0.7 + r);
        ctx.globalAlpha = 0.25 + 0.08 * Math.sin(time * 0.5 + r);
        ctx.stroke();
        ctx.restore();
      }
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
      for (let i = 0; i < PARTICLES.length; i++) {
        const p = PARTICLES[i];
        // Movimiento horizontal suave con oscilación vertical
        const x = ((p.offset + time * p.speed * 0.08) % (width + 80)) - 40;
        const y = p.baseY + p.amplitude * Math.sin(time * p.freq + p.phase);
        // Usar color fijo y variar solo la opacidad suavemente
        const color = p.color;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.38 + 0.18 * Math.sin(time * 0.0015 + i); // Opacidad más baja y suave
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }
    }

    function animate(time) {
      ctx.clearRect(0, 0, width, height);
      drawTunnel(time * 0.001);
      drawAurora(time * 0.001);
      drawWaves(time * 0.001);
      drawParticles(time);
      requestAnimationFrame(animate);
    }
    animate(0);
  }
});
