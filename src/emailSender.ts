import nodemailer from 'nodemailer';

export interface IEmailMessage {
    to: string;
    subject: string;
    text: string;
}

async function sendEmail(message: IEmailMessage): Promise<void> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
            },
        });

        const emailOptions = {
            from: process.env.USER_EMAIL,
            to: message.to,
            subject: message.subject,
            text: message.text,
        };

        await transporter.sendMail(emailOptions);
        console.log(`Email sent successfully to ${message.to}`);
    } catch (error) {
        console.error('Error sending email', (error as Error).message);
        throw error;
    }
}

export { sendEmail };
