import { envs } from '../core/config/env';
import nodemailer from 'nodemailer'


const sendMail = (email: string, subject: string, text: string) => {
    // configuring nodemailer

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: envs.GMAIL_HOST,
        port: envs.GMAIL_PORT,
        secure: true,
        auth: {
            user: envs.GMAIL_EMAIL,
            pass: envs.GMAIL_PASSWORD,
        },
    });
    // composing the mail
    const mailOptions = {
        from: envs.GMAIL_EMAIL,
        to: email,
        subject: subject,
        text: text,
    };
    // sending the mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });


}
export default sendMail