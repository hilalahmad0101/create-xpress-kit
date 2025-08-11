import AuthController from "../controllers/auth.controller.js";
import { authenticateMiddleware } from "../middleware/authenticate.middleware.js";
import { checkNotAuthenticated } from "../middleware/guest.middleware.js";

export default function authRoutes(app) {


    app.get(`/register`, checkNotAuthenticated, AuthController.registerView);
    app.post(`/register`, checkNotAuthenticated, AuthController.register);
    app.get(`/login`, checkNotAuthenticated, AuthController.loginView);
    app.post(`/login`, checkNotAuthenticated, authenticateMiddleware());
    app.get(`/forget-password`, checkNotAuthenticated, AuthController.forgetPassword);
    app.get(`/reset-password`, checkNotAuthenticated, AuthController.resetPassword);
} 