import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, subject, text } = req.body;

        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            
            service: 'gmail', // You can use any service like gmail, yahoo, etc.
            auth: {
                user: process.env.EMAIL_USER, // Your email user from .env file
                pass: process.env.EMAIL_PASS, // Your email password from .env file
            },
        });

        // Setup email data
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        };

        try {
            // Send email
            let info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email in send_email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
