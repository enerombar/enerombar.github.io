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

// --- INICIO CAMBIO: listeners de idioma SIEMPRE activos ---
function setupLanguageListeners() {
  document.querySelectorAll('.lang-option').forEach(option => {
    // Elimina listeners previos si existen
    if (option.dataset.listenerAdded) {
      option.replaceWith(option.cloneNode(true));
    }
  });
  // Vuelve a seleccionar los elementos después de clonar
  document.querySelectorAll('.lang-option').forEach(option => {
    if (!option.dataset.listenerAdded) {
      option.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const lang = this.getAttribute('data-lang');
        if (lang && translations[lang]) {
          currentLang = lang;
          localStorage.setItem('lang', lang);
          updateLangFlag();
          applyTranslations();
        }
        // Cierra el menú Bootstrap correctamente
        const dropdown = document.getElementById('langMenu');
        if (dropdown && dropdown.classList.contains('show')) {
          const toggle = document.getElementById('langToggle');
          if (toggle) toggle.click();
        }
      });
      option.addEventListener('mouseenter', function() {
        this.classList.add('hover');
      });
      option.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
      });
      option.dataset.listenerAdded = "true";
    }
  });
}

// Ejecuta listeners y traducción inicial al cargar el script
window.initAfterNavbar = function() {
  setupLanguageListeners();
  updateLangFlag();
  applyTranslations();

  // Scroll al hacer click en el indicador
  const scrollBtn = document.getElementById('scroll-down-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const nextSection = document.querySelector('#hero + section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Siempre empieza arriba al recargar el index
  if (document.getElementById('hero')) {
    if (window.location.hash) {
      window.scrollTo(0, 0);
      history.replaceState(null, null, window.location.pathname);
    } else {
      window.scrollTo(0, 0);
    }
  }

  // Aplica el fondo gradiente y overlays igual que en index.html
  document.addEventListener('DOMContentLoaded', function() {
    // Elimina el canvas de partículas si existe
    const canvas = document.getElementById('background-canvas');
    if (canvas) {
      canvas.parentNode.removeChild(canvas);
    }

    // Aplica el fondo gradiente y overlay al body
    document.body.style.background = "linear-gradient(120deg, #181c22 0%, #232930 100%)";
    document.body.style.fontFamily = "'Space Grotesk', Arial, sans-serif";
    document.body.style.color = "#e0f7fa";
    document.body.style.minHeight = "100vh";
    document.body.style.position = "relative";
    document.body.style.overflowX = "hidden";

    // Crea el overlay si no existe
    if (!document.getElementById('bg-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'bg-overlay';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '0';
      overlay.style.background = 'radial-gradient(ellipse at 80% 10%, #00eaff22 0%, transparent 60%), radial-gradient(ellipse at 10% 90%, #00bcd422 0%, transparent 70%)';
      document.body.appendChild(overlay);
    }
  });

  // Quitar el cursor de escritura tras la animación de typing
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('animationend', function(e) {
      if (e.animationName === 'typing-effect') {
        heroTitle.classList.add('typing-done');
      }
    });
  }
};