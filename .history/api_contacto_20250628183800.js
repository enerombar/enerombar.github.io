const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const upload = multer();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

// Sirve archivos estáticos desde la carpeta actual
app.use(express.static(path.join(__dirname)));

// Configura tu transporte SMTP aquí
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'personaleneasromero@gmail.com', // Cambia por tu correo
    pass: 'hkje imex allu lgwp' // Usa contraseña de aplicación si es Gmail
  }
});

// Lista simple de palabras obscenas (puedes ampliarla)
const BAD_WORDS = [
  'puta', 'puto', 'cago', 'muertos', 'mierda', 'joder', 'gilipollas', 'cabron', 'pendejo', 'fuck', 'shit', 'bitch', 'asshole'
];

// Expresión regular para validar email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Busca palabras obscenas en el texto (case-insensitive)
function containsBadWords(text) {
  const lower = text.toLowerCase();
  return BAD_WORDS.some(word => lower.includes(word));
}

// Busca patrones básicos de inyección SQL
function containsSQLInjection(text) {
  return /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|UNION|--|;)\b)/i.test(text) ||
         /('|").*('|")=('|")/i.test(text) ||
         /(\bor\b|\band\b).*(=|>|<)/i.test(text);
}

// Sanitiza el texto para evitar encabezados maliciosos y escapes
function sanitize(str) {
  return String(str)
    .replace(/[\r\n]+/g, ' ')
    .replace(/[<>]/g, '')
    .trim();
}

app.post('/api/contacto', upload.none(), async (req, res) => {
  let { name, email, message } = req.body;

  // Sanitiza entradas
  name = sanitize(name);
  email = sanitize(email);
  message = sanitize(message);

  // Validaciones
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Correo electrónico no válido.' });
  }
  if (containsBadWords(name) || containsBadWords(message)) {
    return res.status(400).json({ error: 'El mensaje contiene lenguaje inapropiado.' });
  }
  if (containsSQLInjection(name) || containsSQLInjection(email) || containsSQLInjection(message)) {
    return res.status(400).json({ error: 'Entrada no permitida.' });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio - Eneas Romero" <${email}>`,
      to: 'erbolution55@gmail.com',
      subject: 'PORTFOLIO - Nuevo mensaje de contacto',
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al enviar el correo.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de contacto escuchando en puerto ${PORT}`);
});
