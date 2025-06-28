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
AOS.init({
  once: true,
  mirror: false,
});

// Traducciones y lógica de idioma
// (Removed duplicate translations, currentLang, and language switch logic.)
// The multilanguage logic is now handled by the improved code below.

// Traducciones multilanguage global
const translations = {
  en: {
    navAbout: "About",
    navProjects: "Projects",
    navProjectsPage: "Projects",
    navArticles: "Articles",
    navContact: "Contact",
    heroName: "Eneas Romero",
    heroSubtitle: "Engineering, Creativity & Digital Future",
    btnViewProjects: "View Projects",
    aboutTitle: "About Me",
    aboutText: "I am Eneas Romero, a student of Computer Engineering and Mathematics. I am passionate about software development, artificial intelligence, and sharing knowledge through technical articles.",
    projectsTitle: "Projects",
    project1Title: "Project 1",
    project1Desc: "Brief project description. Technologies used, goals, and results.",
    project2Title: "Project 2",
    project2Desc: "This project doesn't have an image yet, but it looks good with the default banner.",
    project3Title: "Project 3",
    project3Desc: "Project with real image, ready to showcase.",
    btnViewMore: "View More",
    contactTitle: "Contact",
    formName: "Your name",
    formEmail: "Your email",
    formMessage: "Message",
    btnSend: "Send",
    articlesTitle: "Articles"
  },
  es: {
    navAbout: "Sobre mí",
    navProjects: "Proyectos",
    navProjectsPage: "Proyectos",
    navArticles: "Artículos",
    navContact: "Contacto",
    heroName: "Eneas Romero",
    heroSubtitle: "Ingeniería, Creatividad y Futuro Digital",
    btnViewProjects: "Ver proyectos",
    aboutTitle: "Sobre mí",
    aboutText: "Soy Eneas Romero, estudiante de Ingeniería Informática y Matemáticas. Me apasiona el desarrollo de software, la inteligencia artificial y compartir conocimiento a través de artículos técnicos.",
    projectsTitle: "Proyectos",
    project1Title: "Proyecto 1",
    project1Desc: "Descripción breve del proyecto. Tecnologías usadas, objetivos y resultados.",
    project2Title: "Proyecto 2",
    project2Desc: "Este proyecto aún no tiene imagen, pero se ve bien con el banner por defecto.",
    project3Title: "Proyecto 3",
    project3Desc: "Proyecto con imagen real, listo para mostrar.",
    btnViewMore: "Ver más",
    contactTitle: "Contacto",
    formName: "Tu nombre",
    formEmail: "Tu correo",
    formMessage: "Mensaje",
    btnSend: "Enviar",
    articlesTitle: "Artículos"
  }
};

let currentLang = 'es';

function updateLangFlag() {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = currentLang === 'es' ? '🇬🇧' : '🇪🇸';
    langToggle.setAttribute('aria-label', currentLang === 'es' ? 'Switch to English' : 'Cambiar a español');
  }
}

function switchLanguageTo(lang) {
  currentLang = lang;
  updateLangFlag();

  // Cambiar textos con data-key
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });

  // Cambiar placeholders con data-key-placeholder
  document.querySelectorAll('[data-key-placeholder]').forEach(el => {
    const key = el.getAttribute('data-key-placeholder');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.setAttribute('placeholder', translations[currentLang][key]);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    updateLangFlag();
    langToggle.addEventListener('click', function() {
      switchLanguageTo(currentLang === 'es' ? 'en' : 'es');
    });
    switchLanguageTo(currentLang);
  } else {
    switchLanguageTo(currentLang);
  }
});
