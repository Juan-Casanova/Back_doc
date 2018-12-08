const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: 'casanovajm199621@gmail.com', // Cambialo por tu email
 pass: 'juan_casanova9052' // Cambialo por tu password
 }
 });
const mailOptions = {
 from: '"Consulta" <${formulario.email}>',
 to: 'drajimenezsalud@gmail.com', // Cambia esta parte por el destinatario
 subject: formulario.asunto,
 html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>Numero:</strong> ${formulario.numero}<br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}
