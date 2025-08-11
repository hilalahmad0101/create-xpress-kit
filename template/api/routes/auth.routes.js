import UserController from "../controllers/user.controller.js";
export default function userRoutes(app) {
    const url = '/';
    app.get(`${url}`, UserController.test);
} 