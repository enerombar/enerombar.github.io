const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Configura tu transporte SMTP aquí
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'personaleneasromero@gmail.com', // Cambia por tu correo
    pass: 'hkje imex allu lgwp' // Usa contraseña de aplicación si es Gmail
  }
});

app.use(cors());

app.post('/api/contacto', upload.none(), async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'personaleneasromero@gmail.com',
      subject: 'Nuevo mensaje de contacto',
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
