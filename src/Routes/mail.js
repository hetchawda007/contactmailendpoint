import express from 'express';
import { sendMail } from '../Controllers/mailController.js';
const router = express.Router();

router.post('/send', sendMail);

export default router;