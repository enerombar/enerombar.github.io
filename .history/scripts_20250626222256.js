// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if(window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Contact floating button scroll to contact section
document.getElementById('contact-btn').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Inicializar particles.js
document.addEventListener('DOMContentLoaded', function() {
  if (window.particlesJS) {
    particlesJS.load('particles-js', 'particles-config.json', function() {
      // Opcional: callback cuando las partículas están cargadas
      // console.log('particles.js loaded');
    });
  }
});
