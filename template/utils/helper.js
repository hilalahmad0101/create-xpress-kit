import bcrypt from "bcryptjs";
import { transporter } from "../config/email.config.js";
import jwt from 'jsonwebtoken'

export const generateOtp = () => {
    return Math.floor(Math.random() * 1000000);
}

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);

}

export const verifyPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}


export const sendEmailVerification = async (from, to, subject, text) => {
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
    });
    return info.messageId;
}


export const generateJWT = async (user) => {
    user = {
        name: user.name,
        email: user.email,
        tc: user.tc,
        id: user._id
    }
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: '1d' });
}

export const verifyJWT = async (token) => {
    return jwt.verify(token, process.env.SECRET);
}
