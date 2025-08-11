import { Strategy as LocalStrategy } from 'passport-local';
import { verifyPassword } from '../utils/helper.js';

export const initializePassport = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await getUserByEmail(email); // await here
            if (!user) {
                return done(null, false, { message: 'No user with that email' });
            }

            const match = await verifyPassword(password, user.password);
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password is incorrect' });
            }
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
