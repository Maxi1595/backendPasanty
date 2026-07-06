    const z = require('zod');

    const schemaRegistrarPasante = z.object({
        nombre: z.string().trim().min(1, {message: 'El nombre es obligatorio'}),
        correo: z.email({message: 'correo invalido'}),
        contrasena: z.string().min(1, {message: 'La contraseña es obligatoria'}).trim(),
        especialidad: z.string().trim().min(1, {message: 'La especialidad es obligatoria'})
    });
    const schemaRegistrarEmpresa = z.object({
        nombre: z.string().trim().min(1, {message: 'El nombre es obligatorio'}),
        correo: z.email({message: 'correo invalido'}),
        contrasena: z.string().min(1, {message: 'La contraseña es obligatoria'}).trim(),
        direccion: z.string().trim().min(1, {message: 'la direccion es obligatoria'}),
        telefono: z.string().trim().min(1, {message: 'el telefono es obligatorio'}),
        especialidad: z.string().trim().min(1, {message: 'La especialidad es obligatoria'})
    });

    module.exports = {schemaRegistrarPasante, schemaRegistrarEmpresa}