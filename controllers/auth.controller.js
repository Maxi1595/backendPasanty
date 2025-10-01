const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

// Registro
const registrarEmpresa = async (req, res) => {
  try {
    const { nombre, correo, contraseña, direccion, telefono, especialidad } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ mensaje: 'Ya existe una cuenta con ese correo' });

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        contraseña: hashedPassword,
        rol: 5
      }
    })

    const nuevaEmpresa = await prisma.empresa.create({
      data: {
        direccion,
        telefono,
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
const loginEmpresa = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { correo } });
    if (!usuario) return res.status(400).json({ mensaje: 'Correo no registrado' });

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({
      username: usuario.correo,
      id: usuario.id,
      rol: usuario.rol
    }, secretKey, { expiresIn: '1h' });

    res.json({ mensaje: 'Inicio de sesión exitoso',
      user: {
        username: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }, 
      token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

module.exports = { registrarEmpresa, loginEmpresa };
