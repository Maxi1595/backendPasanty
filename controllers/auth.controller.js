const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const { generarAccessToken, generarRefreshToken } = require('../service/auth.service');

// Registro

const registrarPasante = async (req, res) => {
  try {
    const { nombre, contrasena, correo, especialidad } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ mensaje: 'Ya existe una cuenta con ese correo' });

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        contrasena: hashedPassword,
        rol: 3
      }
    })

    const nuevoPasante = await prisma.pasante.create({
      data: {
        especialidad,
        usuarioId: usuario.id,
      }
    });

    res.status(201).json({ mensaje: 'Pasante registrada con éxito', pasante: nuevoPasante });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ mensaje: "Correo o dirección ya en uso" });
    } else {
      res.status(500).json({ mensaje: "Error en el registro", error });
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

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        contrasena: hashedPassword,
        rol: 5
      }
    })

    const nuevaEmpresa = await prisma.empresa.create({
      data: {
        direccion,
        telefono: telefono,
        especialidad,
        usuarioId: usuario.id
      },
    });

    res.status(201).json({ mensaje: 'Empresa registrada con éxito', empresa: nuevaEmpresa });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ mensaje: "Correo o dirección ya en uso" });
    } else {
      res.status(500).json({ mensaje: "Error en el registro", error });
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

    const tokenAccessNuevo = await generarAccessToken(user);
    const tokenRefreshNuevo = await generarRefreshToken(user);

    return res.status(200).json({ tokenAccessNuevo, tokenRefreshNuevo });

  } catch (error) {
    return res.status(500).json({ mensaje: "Error al refrescar token", error });
  }
}

module.exports = { registrarPasante, registrarEmpresa, login, refresh };