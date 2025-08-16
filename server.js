// server.js
const express = require('express');
const dotenv = require('dotenv');
const pasanteRoutes = require('./routes/pasante.routes');

dotenv.config();

const app = express();
app.use(express.json());

// Ruta base para el backend
app.use('/api/pasantes', pasanteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const vacanteRoutes = require('./routes/vacante.routes');
app.use('/api/vacante', vacanteRoutes);