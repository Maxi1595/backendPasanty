const { transporter } = require("../nodemailer/SMTP.transport");

const emailVerificacion = async (email, token) => {

    const emailCodificado = encodeURIComponent(email);

    const info = await transporter.sendMail({
        from: '"Equipo Pasanty" <pasanty.soporte@gmail.com>',
        to: email,
        subject: "Hello",
        text: "hello world",
        html: `<p>Hacé click en el siguiente link para verificar tu cuenta:</p>
               <a href="http://localhost:3000/api/auth/verificar/${emailCodificado}/${token}">Verificar cuenta</a>`
    })

}

module.exports = {
    emailVerificacion,
}