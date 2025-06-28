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
    const langFlag = langToggle.querySelector('#langFlag');
    if (langFlag) {
      langFlag.src = currentLang === 'es' ? 'img/gb.svg' : 'img/es.svg';
    }
    langToggle.setAttribute('aria-label', currentLang === 'es' ? 'Switch to English' : 'Cambiar a español');
  }
}

function applyTranslations() {
  // Cambiar textos con data-key
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
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
  currentLang = currentLang === 'es' ? 'en' : 'es';
  updateLangFlag();
  applyTranslations();
}

document.addEventListener('DOMContentLoaded', function() {
  // Language switcher setup
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', switchLanguage);
  }
  
  // Set initial language state
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
        { amplitude: 25, frequency: 0.008, speed: 0.025, thickness: 1.5, opacity: 0.25, color: '0, 234, 255' },
        { amplitude: 15, frequency: 0.012, speed: 0.015, thickness: 1, opacity: 0.2, color: '150, 100, 255' },
        { amplitude: 35, frequency: 0.005, speed: 0.01, thickness: 2, opacity: 0.15, color: '50, 150, 255' },
        { amplitude: 20, frequency: 0.006, speed: 0.02, thickness: 0.8, opacity: 0.3, color: '0, 255, 200' },
        { amplitude: 30, frequency: 0.01, speed: 0.012, thickness: 1.2, opacity: 0.1, color: '100, 50, 255' }
    ];

    function drawIrregularShape(cx, cy, baseRadius, numVertices, irregularity, rotation = 0) {
        ctx.strokeStyle = 'rgba(0, 234, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= numVertices; i++) {
            const angle = (Math.PI * 2 / numVertices) * i + rotation;
            const radiusOffset = Math.sin(time * 0.0002 + i * 0.5) * irregularity;
            const radius = baseRadius + radiusOffset;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
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

    function animate() {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // 1. Draw waves
      waveConfig.forEach(wave => {
          ctx.strokeStyle = `rgba(${wave.color}, ${wave.opacity})`;
          ctx.lineWidth = wave.thickness;
          ctx.beginPath();
          for (let x = -5; x < width + 5; x++) {
              const y = height * 0.55 + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
              if (x === -5) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();
      });

      // 2. Draw and update points
      points.forEach(p => {
        p.y += p.vy;
        p.opacity += 0.003 * p.opacityDir;

        if (p.opacity > 0.7 || p.opacity < 0.05) p.opacityDir *= -1;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(200, 225, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw and update math symbols
      mathSymbols.forEach(s => {
        s.y += s.vy;
        s.opacity += 0.001 * s.opacityDir;

        if (s.opacity > 0.4 || s.opacity < 0.05) s.opacityDir *= -1;
        if (s.y < -20) s.y = height + 20;
        if (s.y > height + 20) s.y = -20;

        ctx.fillStyle = `rgba(200, 225, 255, ${s.opacity})`;
        ctx.font = `${s.size}px "Roboto Mono", monospace`;
        ctx.fillText(s.char, s.x, s.y);
      });

      // 4. Draw concentric irregular shapes
      const baseRadius = Math.min(width, height) * 0.12;
      const rotation = time * 0.0005;
      drawIrregularShape(width / 2, height / 2, baseRadius, 10, baseRadius * 0.2, rotation);
      drawIrregularShape(width / 2, height / 2, baseRadius * 1.5, 12, baseRadius * 0.25, -rotation * 0.7);

      requestAnimationFrame(animate);
    }
    
    let resizeTimeout;
    function onResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(init, 250);
    }

    init();
    animate();

    window.addEventListener('resize', onResize);
  }
});
  }
});
