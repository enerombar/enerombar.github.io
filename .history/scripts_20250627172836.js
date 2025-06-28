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

// Traducciones y lógica de idioma
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
  },
  fr: {
    navAbout: "À propos",
    navProjects: "Projets",
    navProjectsPage: "Projets",
    navArticles: "Articles",
    navContact: "Contact",
    heroName: "Eneas Romero",
    heroSubtitle: "Ingénierie, Créativité et Futur Numérique",
    btnViewProjects: "Voir les projets",
    aboutTitle: "À propos de moi",
    aboutText: "Je suis Eneas Romero, étudiant en informatique et mathématiques. Passionné par le développement logiciel, l'intelligence artificielle et le partage de connaissances à travers des articles techniques.",
    projectsTitle: "Projets",
    project1Title: "Projet 1",
    project1Desc: "Brève description du projet. Technologies utilisées, objectifs et résultats.",
    project2Title: "Projet 2",
    project2Desc: "Ce projet n'a pas encore d'image, mais il rend bien avec la bannière par défaut.",
    project3Title: "Projet 3",
    project3Desc: "Projet avec image réelle, prêt à être présenté.",
    btnViewMore: "Voir plus",
    contactTitle: "Contact",
    formName: "Votre nom",
    formEmail: "Votre email",
    formMessage: "Message",
    btnSend: "Envoyer",
    articlesTitle: "Articles"
  }
};

// Usa localStorage para recordar el idioma seleccionado
let currentLang = localStorage.getItem('lang') || 'es';

function updateLangFlag() {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const langFlag = langToggle.querySelector('#langFlag') || document.getElementById('langFlag');
    if (langFlag) {
      if (currentLang === 'es') langFlag.src = 'img/es.svg';
      else if (currentLang === 'en') langFlag.src = 'img/gb.svg';
      else if (currentLang === 'fr') langFlag.src = 'img/fr.png';
    }
    let label = '';
    if (currentLang === 'es') label = 'Cambiar idioma';
    else if (currentLang === 'en') label = 'Change language';
    else if (currentLang === 'fr') label = 'Changer la langue';
    langToggle.setAttribute('aria-label', label);
  }
  // Marca la opción activa en el menú
  document.querySelectorAll('.lang-option').forEach(option => {
    if (option.getAttribute('data-lang') === currentLang) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

function applyTranslations() {
  // Cambiar textos con data-key
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    // Si el elemento es el subtítulo y el texto HTML ya ha sido personalizado, no sobrescribirlo
    if (
      key === 'heroSubtitle' &&
      el.textContent.trim() !== translations['es']['heroSubtitle'] &&
      el.textContent.trim() !== translations['en']['heroSubtitle'] &&
      el.textContent.trim() !== translations['fr']['heroSubtitle']
    ) {
      // No sobrescribir el subtítulo personalizado
      return;
    }
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

function switchLanguage() {
  updateLangFlag();
  applyTranslations();
}

// --- INICIO CAMBIO: listeners de idioma SIEMPRE activos ---
function setupLanguageListeners() {
  document.querySelectorAll('.lang-option').forEach(option => {
    // Evita duplicar listeners
    if (!option.dataset.listenerAdded) {
      option.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // <-- Añadido para evitar cierre automático del menú antes de tiempo
        const lang = this.getAttribute('data-lang');
        if (lang && translations[lang]) {
          currentLang = lang;
          localStorage.setItem('lang', lang); // Guarda preferencia
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

  // Animated background
  const canvas = document.getElementById('background-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, time = 0;
    let points = [];
    const numPoints = window.innerWidth > 768 ? 100 : 50;
    let mathSymbols = [];
    const symbols = ['Σ', '∫', 'π', '∞', '∂', '√', '∀', '∃', '∇', 'ℏ'];
    const numSymbols = 15;

    const waveConfig = [
        { amplitude: 25, frequency: 0.008, speed: 0.005, thickness: 1.5, opacity: 0.25, color: '0, 234, 255' },
        { amplitude: 15, frequency: 0.012, speed: 0.015, thickness: 1, opacity: 0.2, color: '150, 100, 255' },
        { amplitude: 35, frequency: 0.005, speed: 0.01, thickness: 2, opacity: 0.15, color: '50, 150, 255' },
   ];

    function drawIrregularShape(cx, cy, baseRadius, numVertices, irregularity, rotation = 0) {
        ctx.strokeStyle = 'rgba(0, 234, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Parámetros para el ruido
        const noiseScale = 0.25 + Math.random() * 0.15;
        const noiseStrength = irregularity * 0.5;
        for (let i = 0; i <= numVertices; i++) {
            const angle = (Math.PI * 2 / numVertices) * i + rotation;
            const baseOffset = Math.sin(time * 0.0002 + i * 0.5) * irregularity;
            // Ruido adicional en la línea
            const noise =
                Math.sin(angle * 3 + time * 0.001 + cx * 0.0001 + cy * 0.0001) * noiseStrength * noiseScale +
                Math.cos(angle * 7 + time * 0.0015 - cy * 0.0002) * noiseStrength * (1 - noiseScale) * 0.7;
            const radius = baseRadius + baseOffset + noise;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points = [];
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          vy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.1,
          opacityDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
      mathSymbols = [];
      for (let i = 0; i < numSymbols; i++) {
        mathSymbols.push({
            char: symbols[Math.floor(Math.random() * symbols.length)],
            x: Math.random() * width,
            y: Math.random() * height,
            vy: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.2 + 0.05,
            opacityDir: Math.random() > 0.5 ? 1 : -1,
            size: Math.random() * 12 + 12
        });
      }
    }

    // Añade este listener para que el fondo se adapte al tamaño de la ventana
    window.addEventListener('resize', function() {
      init();
    });

    init();
    animate();

  }

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