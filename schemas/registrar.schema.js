const z = require('zod');

const schemaRegistrarPasante = z.object({
    nombre: z.string().trim().min(3, { message: 'El nombre es obligatorio (minimo de 3 caracteres)' }).refine((val) => !/\d/.test(val), { message: 'El nombre no debe contener números', }),
    correo: z.email({ message: 'correo invalido' }),
    contrasena: z.string().min(8, { message: 'La contraseña es obligatoria que tenga 8 caracteres' }).trim(),
    especialidad: z.string({
        error: 'La especialidad es obligatoria'
    }).trim().min(1, {
        message: 'La especialidad es obligatoria'
    }),
    direccion: z.string().trim().min(5, { message: 'debe colocar la direccion' }),
    estadoAcademico: z.string().trim()
});
const schemaRegistrarEmpresa = z.object({
    nombre: z.string().trim().min(1, { message: 'El nombre es obligatorio' }),
    correo: z.email({ message: 'correo invalido' }),
    contrasena: z.string().min(8, { message: 'La contraseña es obligatoria que tenga 8 caracteres' }).trim(),
    direccion: z.string().trim().min(1, { message: 'la direccion es obligatoria' }),
    telefono: z.string().trim().optional().or(z.literal('')),
    especialidad: z.string().trim().min(1, { message: 'La especialidad es obligatoria' })
});

module.exports = { schemaRegistrarPasante, schemaRegistrarEmpresa }