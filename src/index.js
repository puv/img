const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const db = require("./database/database");
const Routes = require("./routes/_routes.js");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

db.init()
    .then(async () => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("trust proxy", true);

// app.use(flash());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
    })
);

// File Upload
app.use(fileUpload());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie Parser
app.use(cookieParser());

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Middleware Routes
app.use("/", Routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
