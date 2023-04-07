const express = require("express");
const router = express.Router();

router.use("/", require("./index"));
router.use("/api", require("./api"));
router.use("/post", require("./post"));

//Errors
router.use("/api/*", require("./errors").APIErrors);
router.use("*", require("./errors").GUIErrors);

module.exports = router;
