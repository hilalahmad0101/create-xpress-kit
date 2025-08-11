import AuthController from "../controllers/auth.controller.js";
import UserController from "../controllers/user.controller.js";
import { checkAuthenticated } from "../middleware/auth.middleware.js";

export default function webRoutes(app) {
    app.get(`/`, checkAuthenticated, UserController.home);
    app.post(`/logout`, checkAuthenticated, AuthController.logout);

} 