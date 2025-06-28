// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if(window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Esperar a que el DOM esté listo para buscar el botón de contacto y cargar partículas
document.addEventListener('DOMContentLoaded', function() {
  // Contact floating button scroll to contact section
  const contactBtn = document.getElementById('contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Inicializar particles.js directamente con el objeto de configuración
  if (window.particlesJS) {
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 60 },
        "color": { "value": "#00eaff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.8 },
        "size": { "value": 5, "random": true },
        "line_linked": { "enable": true, "distance": 130, "color": "#00eaff", "opacity": 0.6, "width": 2 },
        "move": { "enable": true, "speed": 2 }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" }
        },
        "modes": {
          "grab": { "distance": 180, "line_linked": { "opacity": 1 } },
          "push": { "particles_nb": 4 }
        }
      },
      "retina_detect": true
    });
  }
});
