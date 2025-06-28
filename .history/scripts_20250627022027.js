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
    let width, height;
    let particles = [];
    const numParticles = window.innerWidth > 768 ? 80 : 40;
    const connectDistance = window.innerWidth > 768 ? 120 : 90;

    const particleColor = 'rgba(0, 234, 255, 0.7)';
    const lineColor = 'rgba(0, 234, 255, 0.15)';

    function init() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = particleColor;
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < connectDistance) {
            ctx.globalAlpha = 1 - (dist / connectDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    function update() {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      draw();
      update();
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
