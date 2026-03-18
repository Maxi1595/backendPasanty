const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const { generarAccessToken, generarRefreshToken, crearUsuario } = require('../service/auth.service');
const { crearEmpresa } = require('../service/empresa.service');
const { crearPasante } = require('../service/pasante.service');
const { successResponse, errorResponse } = require('../utils/response');

// Registro

const registrarPasante = async (req, res) => {
  try {
    const { nombre, contrasena, correo, especialidad } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ mensaje: 'Ya existe una cuenta con ese correo' });

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const usuario = await crearUsuario(nombre, correo, hashedPassword, 3);

    const nuevoPasante = await crearPasante(especialidad, usuario.id);

    return successResponse(res, nuevoPasante, 201);
  } catch (error) {
    if (error.code === "P2002") {
      return errorResponse(res, "Correo o dirección ya en uso", 400);
    } else {
      return errorResponse(res, error, 500);
    }
  }
};


const registrarEmpresa = async (req, res) => {
  try {
    const { nombre, correo, contrasena, direccion, telefono, especialidad } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ mensaje: 'Ya existe una cuenta con ese correo' });

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    if (!telefono || telefono.trim() === "") {
      return res.status(400).json({ mensaje: "El teléfono es obligatorio" });
    }

    const usuario = await crearUsuario(nombre, correo, hashedPassword, 5);

    const nuevaEmpresa = await crearEmpresa(direccion, telefono, especialidad, usuario.id)

    return successResponse(res, nuevaEmpresa, 201);
  } catch (error) {
    if (error.code === "P2002") {
      return errorResponse(res, "Correo o dirección ya en uso", 400);
    } else {
      return errorResponse(res, error, 500);
    }
  }
};

// Login
const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { correo } });
    if (!usuario) return res.status(400).json({ mensaje: 'Correo no registrado' });

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const tokenAccess = await generarAccessToken(usuario);
    const tokenRefresh = await generarRefreshToken(usuario);

    return res.json({
      user: {
        username: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      },
      tokenAccess,
      tokenRefresh
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

const refresh = async (req, res) => {
  try {
    const { tokenRefresh } = req.body;
    if (!tokenRefresh) {
      return res.status(401).json({ mensaje: "no se envio nada, reenvie el tokenrefresh por favor" })
    }
    
    const token = jwt.verify(tokenRefresh, secretKey);
    
    const user = await prisma.usuario.findFirst({ where: { id: token.id } })
    
    if (!user) {
      return res.status(403).json({ mensaje: "No se encontro al usuario" })
    }
    
    const tokenAccess = await generarAccessToken(user);

    return res.status(200).json({ tokenAccess });

  } catch (error) {
    return res.status(401).json({ mensaje: "Error al refrescar token", error });
  }
}

module.exports = { registrarPasante, registrarEmpresa, login, refresh };