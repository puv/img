const router = require("express").Router();
const User = require("../../database/models/User");
const dotenv = require("dotenv");
const passport = require("passport");
dotenv.config();

router.all("/", passport.authenticate("discord"), async (req, res) => {
    res.redirect("/");
});

module.exports = router;
