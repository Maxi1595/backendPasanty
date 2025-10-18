// server.js
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const pasanteRoutes = require('./routes/pasante.routes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173' // aquí pones el origen de tu front
}));

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

const postulanteRoutes = require('./routes/postulantes.routes');
app.use('/api/postulantes', postulanteRoutes);

const usuarioRoutes = require('./routes/usuario.routes');
app.use('/api/usuario', usuarioRoutes);