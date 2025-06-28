// Pantalla de carga
window.addEventListener('load', function() {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hide');
    }
  }, 200);
});

// Inicializar AOS
// AOS.init({
//   once: true,
//   mirror: false,
// });

// Quitar el cursor de escritura tras la animación de typing
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('animationend', function(e) {
      // Ensure the animation name matches exactly as defined in your CSS
      if (e.animationName === 'typing-effect') {
        heroTitle.classList.add('typing-done');
      } else {
        // For debugging: log the animation name
        console.log('Animation ended:', e.animationName);
      }
    });
  }
});