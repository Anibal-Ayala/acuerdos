/*import express from 'express';
import { createTransport } from 'nodemailer'; 
const app = express()


const transporter =
   createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: 'anibalayala1990@gmail.com',
        pass: ''
    }
});

app.post('/enviar-correo', (req, res)=>{
    const {nombre, fechaVencimiento} = req.body;

    const mailOptions = {
        from: 'anibalayala1990@gmail.com',
        to: 'anibalayala2017@hotmail.com',
        subject : '¡Aviso: Contrato próximo a vencer!',
        text: `El contrato "${contrato.nombre}" esta proximo a vencer. Fecha de vencimiento ${contrato.fechaVencimiento}`
    }

    transporter.sendMail(mailOptions,
        (error, info) => {
            if(error){
                console.log(error);
                res.status(500).send('Error al enviar el correo');

            } else{
                console.log('Email sent: ' + info.response);
                res.send('Correo enviado correctamente');
            }
        });
    
});



app.listen(3000, () => {
    console.log('Servidor escuchando el puerto 3000');
});*/