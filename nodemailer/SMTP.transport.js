const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
});


module.exports = {
    transporter
}


// async function enviarCorreo() {
//     console.log("Iniciando envío...");

//     try {
//         const info = await transporter.sendMail({
//             from: '"Equipo Pasanty" <pasanty.soporte@gmail.com>',
//             to: 'pasanty.soporte@gmail.com',
//             subject: "Hello",
//             text: "hello world",
//             html: "<b> Hello world </b>"
//         });
//         console.log("Message sent: %s", info.messageId);
//     } catch (err) {
//         console.error("Error while sending mail:", err);
//     }
//     console.log("Función terminada.");
// }

// console.log("Antes de llamar a enviarCorreo");
// enviarCorreo();
// console.log("Después de llamar a enviarCorreo (esto se imprime antes por ser async)");
