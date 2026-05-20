const z = require('zod');

const schemaLogin = z.object({
    correo: z.email({message: 'Correo invalido'}),
    contrasena: z.string().min(1, {message: 'La contraseña es obligatoria'}).trim(),
});

module.exports = {schemaLogin}