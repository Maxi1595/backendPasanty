// controllers/pasante.controller.js
const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const path = require('path');


const obtenerPasantes = async (req, res) => {
  try {
    const pasantes = await prisma.pasante.findMany({
      include: {
        usuario: {
          select: {
            nombre: true
          }
        }
      }
    });
    res.json(pasantes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pasantes", error });
  }
};

const obtenerPasantesPorId = async (req, res) => {
  try {
    const pasante = await prisma.pasante.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        usuario: {
          select: {
            nombre: true,
            correo: true
          }
        }
      }
    });
    if (pasante === null) {
      return res.status(404).json({ mensaje: "no se encontro el pasante" });
    }
    res.json(pasante);
  } catch (error) {
    res.status(500).json({ mensaje: "error al obtener el pasante", error });
  }
}

// const crearPasante = async (req, res) => {
//   try {
//     const { nombre, contrasena, correo, especialidad } = req.body

//     const hashedPassword = await bcrypt.hash(contrasena, 10);
//     console.log("paso 1");
//     const usuario = await prisma.usuario.create({
//       data: {
//         nombre,
//         correo,
//         contrasena: hashedPassword,
//         rol: 3
//       }
//     })
//     console.log("paso 2");
//     const nuevoPasante = await prisma.pasante.create({
//       data: {
//         especialidad,
//         usuarioId: usuario.id,
//       }
//     });
//     console.log("paso 3")
//     res.status(201).json(nuevoPasante);
//   } catch (error) {
//     res.status(400).json({ mensaje: "Error al crear pasante", error });
//   }
// };

const actualizarPasante = async (req, res) => {
  try {
    const pasante = await prisma.pasante.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(pasante)
  }
  catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el pasante", error });
  }
}

const eliminarPasante = async (req, res) => {
  try {
    const pasante = await prisma.pasante.delete({
      where: { id: Number(req.params.id) },
    })
    res.json(pasante);
  }
  catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar el pasante", error });
  }
}

const subirCV = async (req, res) => {
  const pasanteId = parseInt(req.user.id);
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se subió ningún archivo" });
  }

  try {
    const rutaCV = req.file.path;
    const pasanteActualizado = await prisma.pasante.update({
      where: { usuarioId: pasanteId },
      data: { cv: rutaCV }
    });

    res.status(200).json({ mensaje: "CV subido exitosamente", pasante: pasanteActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al subir el CV", error });
  }
};

const verPropioCV = async (req, res) => {
  try {
    const pasante = await prisma.pasante.findUnique({
      where: { usuarioId: Number(req.user.id) },
      select: { cv: true }
    })

    if (!pasante.cv){
      return res.status(404).json({ mensaje: "Aun no subes tu CV" });
    }

    const CV = path.resolve(__dirname, '..', pasante.cv);

    return res.sendFile(CV);
  } catch (error) {
    return res.status(404).json({ mensaje: "no se encontro el CV", error });
  }
}

const verCV = async (req, res) => {
  try {
    const pasante = await prisma.pasante.findUnique({
      where: { id: Number(req.params.id) },
      select: { cv: true }
    })

    if(!pasante.cv){
      return res.status(404).json({ mensaje: "El pasante todavia no ha subido su CV"});
    }

    if (!pasante) {
      return res.status(404).json({ mensaje: "No se encontró ningún pasante con ese ID" });
    }

    const CV = path.resolve(__dirname, '..', pasante.cv);

    return res.sendFile(CV);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al obtener el CV",
      error: error.message,
      stack: error.stack
    });
  }
}


module.exports = {
  obtenerPasantes,
  obtenerPasantesPorId,
  // crearPasante,
  actualizarPasante,
  eliminarPasante,
  subirCV,
  verPropioCV,
  verCV,
};
