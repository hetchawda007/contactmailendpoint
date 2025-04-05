import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const app = express();
    
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

const transporter = nodemailer.createTransport({
    host: "mail.domain.com", // Example: mail.yourdomain.com
    port: 143, 
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/send", async (req, res) => {
    const { to, subject, text } = req.body;
    console.log(`Sending email to ${to} with subject "${subject}" and text "${text}"`);
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });

        res.json({ success: true, message: "Email sent!", info });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});