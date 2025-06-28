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
  let getCurrentCanvasSize = null;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, time = 0;
    let points = [];
    const numPoints = window.innerWidth > 768 ? 100 : 50;
    let mathSymbols = [];
    const symbols = ['Σ', '∫', 'π', '∞', '∂', '√', '∀', '∃', '∇', 'ℏ'];
    const numSymbols = 15;

    // --- NUEVO: función para saber si el hero está en fullscreen ---
    const hero = document.getElementById('hero');
    function isHeroFullscreen() {
      return document.fullscreenElement === hero;
    }

    // --- Modifica waveConfig para soportar opacidad dinámica ---
    const baseWaveConfig = [
        { amplitude: 25, frequency: 0.008, speed: 0.005, thickness: 1.5, opacity: 0.25, color: '0, 234, 255' },
        { amplitude: 15, frequency: 0.012, speed: 0.015, thickness: 1, opacity: 0.2, color: '150, 100, 255' },
        { amplitude: 35, frequency: 0.005, speed: 0.01, thickness: 2, opacity: 0.15, color: '50, 150, 255' },
    ];

    // --- NUEVO: función para obtener tamaño actual del canvas según modo fullscreen ---
    getCurrentCanvasSize = function() {
      if (document.fullscreenElement === hero && hero) {
        return { width: hero.offsetWidth, height: hero.offsetHeight };
      } else {
        return { width: window.innerWidth, height: window.innerHeight };
      }
    };

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
      // --- CAMBIO: usa getCurrentCanvasSize() ---
      const size = getCurrentCanvasSize ? getCurrentCanvasSize() : { width: window.innerWidth, height: window.innerHeight };
      width = canvas.width = size.width;
      height = canvas.height = size.height;
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
      // --- CAMBIO: ajusta tamaño del canvas dinámicamente en cada frame ---
      const size = getCurrentCanvasSize ? getCurrentCanvasSize() : { width: window.innerWidth, height: window.innerHeight };
      if (canvas.width !== size.width || canvas.height !== size.height) {
        canvas.width = size.width;
        canvas.height = size.height;
        width = size.width;
        height = size.height;
        // Reposiciona puntos y símbolos para el nuevo tamaño
        init();
      } else {
        width = size.width;
        height = size.height;
      }
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // --- NUEVO: ajusta opacidad y color si está en fullscreen ---
      const fullscreen = isHeroFullscreen();
      // Multiplicadores de opacidad y color para modo claro en fullscreen
      const opacityBoost = fullscreen ? 0.4 : 1;
      const colorBoost = fullscreen ? 1.15 : 1; // Solo un poco más claro, no blanco
      const pointOpacityBoost = fullscreen ? 0.4 : 1;
      const symbolOpacityBoost = fullscreen ? 0.4 : 1;

      // 1. Draw waves
      baseWaveConfig.forEach(wave => {
          const boostedOpacity = Math.min(wave.opacity * opacityBoost, 0.9);
          // Si está en fullscreen, usa un azul más oscuro para no competir con el texto
          let color = wave.color;
          if (fullscreen) {
            // Mezcla el color con un azul oscuro, no claro
            const rgb = color.split(',').map(Number);
            // Mezcla con azul oscuro (rgb(10,25,40))
            color = `${Math.round(rgb[0] * 0.5 + 10 * 0.5)}, ${Math.round(rgb[1] * 0.5 + 25 * 0.5)}, ${Math.round(rgb[2] * 0.5 + 40 * 0.5)}`;
          }
          ctx.strokeStyle = `rgba(${color}, ${boostedOpacity})`;
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

        // --- Puntos más oscuros en fullscreen ---
        let pointColor = fullscreen ? 'rgba(100,150,200,' : 'rgba(200, 225, 255,';
        let opacity = Math.min(p.opacity * pointOpacityBoost, 1.0);
        ctx.fillStyle = `${pointColor} ${opacity})`;
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

        // --- Símbolos más oscuros en fullscreen ---
        let symbolColor = fullscreen ? 'rgba(100,150,200,' : 'rgba(200, 225, 255,';
        let opacity = Math.min(s.opacity * symbolOpacityBoost, 0.85);
        ctx.fillStyle = `${symbolColor} ${opacity})`;
        ctx.font = `${s.size}px "Roboto Mono", monospace`;
        ctx.fillText(s.char, s.x, s.y);
      });

      // 4. Draw multiple concentric irregular shapes with Bezier smoothing
      const baseRadius = Math.min(width, height) * 0.15;
      const numShapes = 4;
      const rotation = time * 0.0005;
      // --- Colores más oscuros en fullscreen ---
      const irregularColors = fullscreen
        ? [
            'rgba(10, 25, 40, OPACITY)',      // azul muy oscuro
            'rgba(0, 100, 120, OPACITY)',      // cian oscuro
            'rgba(20, 80, 150, OPACITY)',    // azul oscuro
            'rgba(50, 100, 150, OPACITY)'     // azul oscuro medio
          ]
        : [
            'rgba(0, 234, 255, OPACITY)',      // azul cian
            'rgba(255,255,255, OPACITY)',      // blanco
            'rgba(100, 180, 255, OPACITY)',    // azul claro
            'rgba(0, 180, 200, OPACITY)'       // azul verdoso
          ];
      for (let i = 0; i < numShapes; i++) {
        const radius = baseRadius * (1 + i * 0.5);
        const vertices = 9 + i * 2;
        const irregularity = baseRadius * (0.15 + i * 0.07);
        const rot = rotation * (i % 2 === 0 ? 1 : -1) * (1 + i * 0.2);

        let opacity = (0.025 + i * 0.01) * (fullscreen ? 0.8 : 1);
        if (fullscreen) opacity = Math.min(opacity, 0.22);
        let color = irregularColors[i % irregularColors.length].replace('OPACITY', opacity.toFixed(3));
        ctx.strokeStyle = color;
        ctx.lineWidth = 1 + i * 0.4;
        ctx.beginPath();
        let first = true;
        let prev = null;
        for (let j = 0; j <= vertices; j++) {
          const angle = (Math.PI * 2 / vertices) * j + rot;
          const radiusOffset = Math.sin(time * 0.0002 + j * 0.5 + i) * irregularity;
          const r = radius + radiusOffset;
          const x = width / 2 + r * Math.cos(angle);
          const y = height / 2 + r * Math.sin(angle);

          if (first) {
            ctx.moveTo(x, y);
            prev = {x, y};
            first = false;
          } else {
            // Suaviza la curva con Bezier
            const cpx = (prev.x + x) / 2 + Math.sin(angle * 2 + time * 0.0005 + i) * 8;
            const cpy = (prev.y + y) / 2 + Math.cos(angle * 2 + time * 0.0005 + i) * 8;
            ctx.quadraticCurveTo(cpx, cpy, x, y);
            prev = {x, y};
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Tubo coloreado (gradiente) como única onda horizontal, alineada con la onda sutil
      const tubeBaseY = height * 0.55;
      ctx.save();
      let tubeY = [];
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const y = tubeBaseY +
          Math.sin(x * 0.012 + time * 0.008) * 28 +
          Math.cos(x * 0.02 + time * 0.005) * 12;
        tubeY.push(y);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let x = width; x >= 0; x -= 2) {
        const y = tubeY[x / 2] + 18;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      // --- Gradiente oscuro en fullscreen ---
      const grad = ctx.createLinearGradient(0, tubeBaseY, 0, tubeBaseY + 18);
      if (fullscreen) {
        grad.addColorStop(0, 'rgba(0,100,120,0.15)');
        grad.addColorStop(0.5, 'rgba(10,25,40,0.1)');
        grad.addColorStop(1, 'rgba(20,80,150,0.08)');
      } else {
        grad.addColorStop(0, 'rgba(0,234,255,0.18)');
        grad.addColorStop(0.3, 'rgba(255,255,255,0.13)');
        grad.addColorStop(0.5, 'rgba(0,180,255,0.11)');
        grad.addColorStop(0.7, 'rgba(255,255,255,0.10)');
        grad.addColorStop(1, 'rgba(0,120,255,0.08)');
      }
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Solo una onda sutil debajo del tubo, alineada (oscura en fullscreen)
      ctx.save();
      ctx.strokeStyle = fullscreen ? `rgba(50,100,150, 0.1)` : `rgba(100, 180, 255, 0.045)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 4) {
        const y = tubeBaseY + 28 +
          Math.sin(x * 0.012 + time * 0.008 + 1.5) * 12 +
          Math.cos(x * 0.02 + time * 0.005 - 2) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(animate);
    }

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

  // --- HERO FULLSCREEN CANVAS SUPPORT ---
  const hero = document.getElementById('hero');
  const heroCanvas = document.getElementById('background-canvas');
  let originalCanvasStyle = null;
  let resizeCanvasForFullscreen = null;
  if (hero && heroCanvas) {
    resizeCanvasForFullscreen = function() {
      if (document.fullscreenElement === hero) {
        if (!originalCanvasStyle) {
          originalCanvasStyle = {
            position: heroCanvas.style.position,
            zIndex: heroCanvas.style.zIndex,
            top: heroCanvas.style.top,
            left: heroCanvas.style.left,
            width: heroCanvas.style.width,
            height: heroCanvas.style.height,
            pointerEvents: heroCanvas.style.pointerEvents,
          };
        }
        heroCanvas.style.position = 'absolute';
        heroCanvas.style.zIndex = '0';
        heroCanvas.style.top = '0';
        heroCanvas.style.left = '0';
        heroCanvas.style.width = '100%';
        heroCanvas.style.height = '100%';
        heroCanvas.style.pointerEvents = 'none';
        // El tamaño real del canvas se ajusta en cada frame por animate()
        if (heroCanvas.parentNode !== hero) {
          hero.insertBefore(heroCanvas, hero.firstChild);
        }
      } else if (originalCanvasStyle) {
        heroCanvas.style.position = originalCanvasStyle.position || '';
        heroCanvas.style.zIndex = originalCanvasStyle.zIndex || '';
        heroCanvas.style.top = originalCanvasStyle.top || '';
        heroCanvas.style.left = originalCanvasStyle.left || '';
        heroCanvas.style.width = originalCanvasStyle.width || '';
        heroCanvas.style.height = originalCanvasStyle.height || '';
        heroCanvas.style.pointerEvents = originalCanvasStyle.pointerEvents || '';
        if (heroCanvas.parentNode !== document.body) {
          document.body.appendChild(heroCanvas);
        }
        // El tamaño real del canvas se ajusta en cada frame por animate()
      }
    };

    document.addEventListener('fullscreenchange', function() {
      setTimeout(resizeCanvasForFullscreen, 10);
    });
    window.addEventListener('resize', function() {
      if (document.fullscreenElement === hero) {
        resizeCanvasForFullscreen();
      }
    });
  }
  // --- FIN HERO FULLSCREEN CANVAS SUPPORT ---
};