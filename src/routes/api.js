const router = require("express").Router();

// here where we declare all api routes
router.use("/auth", require("./api/auth"));

router.use("/upload", require("./api/upload"));
router.use("/post", require("./api/post"));

module.exports = router;
