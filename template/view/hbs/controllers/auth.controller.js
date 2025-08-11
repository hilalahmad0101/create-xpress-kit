import UserModel from '../models/User.model.js';
import { hashPassword, verifyPassword } from '../utils/helper.js';
export default class AuthController {

    static registerView = async (req, res) => {
        return res.render('auth/register', {
            title: 'Register',
            layout: 'layouts/guest'
        })
    }

    static register = async (req, res) => {
        try {

            const { name, email, password, password_confirmation } = req.body;
            if (!name || !email || !password || !password_confirmation) {
                req.flash('error', 'All fields are required!');
                return res.redirect('/register');
            }
            if (password !== password_confirmation) {
                req.flash('error', 'Passwords do not match!');
                return res.redirect('/register');
            }
            const user = await UserModel.findOne({ email });
            if (user) {
                req.flash('error', 'Email already exists!');
                return res.redirect('/register');
            }
            const hash_password = await hashPassword(password);
            const newUser = await UserModel({
                name,
                email,
                password: hash_password,
            });

            await newUser.save();
            req.flash('success', 'Registration successful!');
            return res.redirect('/login');

        } catch (e) {
            req.flash('error', e.message);
            return res.redirect('/register');
        }
    }


    static loginView = async (req, res) => {
        return res.render('auth/login', {
            title: 'Login',
            layout: 'layouts/guest'
        })
    };


    static forgetPassword = async (req, res) => {
        return res.render('auth/forget-password', {
            title: 'Forget Password',
            layout: 'layouts/guest'
        })
    }

    static resetPassword = async (req, res) => {
        return res.render('auth/reset-password', {
            title: 'Reset Password',
            layout: 'layouts/guest'
        })
    }


    static logout = async (req, res) => {
        try {
            req.logout(err => {
                if (err) { return next(err); }
                req.flash('success', 'You have been logged out!');
                return res.redirect('/login');
            });


        } catch (e) {
            req.flash('error', e.message);
            return res.redirect('/');
        }
    }

}