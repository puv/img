const express = require("express");
const router = express.Router();

router.use("/", require("./index"));
router.use("/api", require("./api")); // This does have tree's routes ex. api/upload

//errors
router.use("/api/*", require("./errors").APIErrors);
router.use("*", require("./errors").GUIErrors);

module.exports = router;
