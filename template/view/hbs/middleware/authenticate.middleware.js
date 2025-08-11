import passport from "passport"

export const authenticateMiddleware = () => {
    return passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })
}