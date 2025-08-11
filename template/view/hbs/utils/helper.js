import bcrypt from 'bcryptjs';
import { transporter } from '../config/email.config.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const logFilePath = path.join(process.cwd(), 'email.log');
// hash password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}


export const verifyPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}


export const sendEmailVerification = async (from, to, subject, text) => {

    if (process.env.MAIL_DRIVER === 'log') {
        const logData = `[${new Date().toISOString()}] From: ${from}, To: ${to}, Subject: ${subject}, Text: ${text}\n`;
        fs.appendFileSync(logFilePath, logData, 'utf8');
        console.log(`Email logged to ${logFilePath}`);
        return 'logged';
    }

    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
    });
    return info.messageId;
}