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

  // Inicializar particles.js
  if (window.particlesJS) {
    particlesJS.load('particles-js', 'particles-config.json', function() {
      // Opcional: callback cuando las partículas están cargadas
      // console.log('particles.js loaded');
    });
  }
});
