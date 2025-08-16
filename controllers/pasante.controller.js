// controllers/pasante.controller.js
const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const obtenerPasantes = async (req, res) => {
  try {
    const pasantes = await prisma.pasante.findMany();
    res.json(pasantes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pasantes", error });
  }
};

const crearPasante = async (req, res) => {
  try {
    const {nombre, constraseña, correo, especialidad} = req.body

    const hashedPassword = await bcrypt.hash(constraseña, 10);

    const Usuario = await prisma.usuario.create ({
      data: {
        nombre,
        correo,
        contraseña: hashedPassword,
        rol: 1
      }
    })
    const nuevoPasante = await prisma.pasante.create({
      data: {
        especialidad,
        usuarioId: usuario.id,
      }
    });
    res.status(201).json(nuevoPasante);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear pasante", error });
  }
};

const actualizarPasante = async (req, res) => {
    try{
        const pasante = await prisma.pasante.update({
          where: { id: Number(req.params.id) },
          data:req.body,  
        });
        res.json(pasante)
    }
    catch(error){
        res.status(400).json({ mensaje: "Error al actualizar el pasante", error});
    }
}

const eliminarPasante = async (req, res) => {
    try{
        const pasante = await prisma.pasante.delete({
            where: { id: Number( req.params.id) },
        })
        res.json(pasante);
    }
    catch (error){
        res.status(400).json({ mensaje: "Error al eliminar el pasante", error});
    }
}

const subirCV = async (req, res) => {
  const pasanteId = parseInt(req.params.id);
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se subió ningún archivo" });
  }

  try {
    const rutaCV = req.file.path;
    const pasanteActualizado = await prisma.pasante.update({
      where: { id: pasanteId },
      data: { cv: rutaCV }
    });

    res.status(200).json({ mensaje: "CV subido exitosamente", pasante: pasanteActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al subir el CV", error });
  }
};

module.exports = {
  obtenerPasantes,
  crearPasante,
  actualizarPasante,
  eliminarPasante,
  subirCV,
};
