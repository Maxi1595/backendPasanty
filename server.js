// server.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require("helmet");

const errorHandler = require('./middlewares/error.middleware')
const pasanteRoutes = require('./routes/pasante.routes');
const authRoutes = require('./routes/auth.routes');
const vacanteRoutes = require('./routes/vacante.routes');
const postulanteRoutes = require('./routes/postulantes.routes');
const usuarioRoutes = require('./routes/usuario.routes');

dotenv.config();
const app = express();

const limit = rateLimit({
    windowMs: 60000,
    message: {error: 'llego demasiadas request'}
});
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-pasanty-mjfh.vercel.app'
  ]
}));

app.use('/api/', limit);
// Ruta base para el backend
app.use('/api/pasantes', pasanteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vacante', vacanteRoutes);
app.use('/api/postulantes', postulanteRoutes);
app.use('/api/usuario', usuarioRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});