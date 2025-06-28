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

  // Fondo animado: ondas de Fourier (matemáticas e informática)
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

    // Configuración de ondas
    const waves = [
      { amplitude: 40, frequency: 0.008, speed: 0.015, color: "#00eaff", phase: 0 },
      { amplitude: 28, frequency: 0.012, speed: 0.022, color: "#2575fc", phase: Math.PI / 2 },
      { amplitude: 18, frequency: 0.018, speed: 0.018, color: "#00bcd4", phase: Math.PI },
      { amplitude: 12, frequency: 0.024, speed: 0.025, color: "#fff", phase: Math.PI / 3 }
    ];

    function drawWaves(time) {
      ctx.clearRect(0, 0, width, height);
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

    function animate(time) {
      drawWaves(time * 0.001);
      requestAnimationFrame(animate);
    }
    animate(0);
  }
});
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
