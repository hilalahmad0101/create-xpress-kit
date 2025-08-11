import express from 'express'
import path from 'path'
import { fileURLToPath } from "url";
import webRoutes from './routes/web.routes.js';
import authRoutes from './routes/auth.routes.js';
import hbs from 'hbs'
import connectDB from './config/connectDB.js';
import session from 'express-session'
import flash from 'express-flash'
import MongoStore from 'connect-mongo';
import passport from 'passport';
import dotenv from 'dotenv'
import { initializePassport } from './config/passport.config.js';
import UserModel from './models/User.model.js';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.join(__dirname, 'public');
const templatePath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');
dotenv.config()
// connectDb
connectDB();

app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // your MongoDB URI
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));
app.use(passport.initialize());
app.use(passport.session());
// make user available to all views
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.userFirstLetter = req.user?.name?.charAt(0);
    next();
});
initializePassport(
    passport,
    async email => await UserModel.findOne({ email }), // async MongoDB query
    async id => await UserModel.findById(id)
)


// Set HBS as view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
hbs.registerHelper('firstChar', str => str ? str.charAt(0) : '');


app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // for JSON bodies
// Serve static files
app.use(express.static(staticPath));


// web routes
webRoutes(app)
authRoutes(app)

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
