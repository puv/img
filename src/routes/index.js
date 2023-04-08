const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        user: req.session.passport ? req.session.passport.user : null
    });
});

module.exports = router;
