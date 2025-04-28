import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mail from './Routes/mail.js';
import authmiddleware from './middleware/authmiddleware.js';
import { rateLimit } from 'express-rate-limit';
const app = express();

dotenv.config();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 5, // Limit each IP to 5 requests per `window` (here, per  minutes).
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})

app.use(limiter)
console.log(process.env.CLIENT_URL);
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true, // allow credentials like cookies, Authorization headers
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests globally

app.use(bodyParser.json());
const port = process.env.PORT;

app.use('/api/v1', authmiddleware.authenticateApiKey, mail);

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});