const express = require("express");
const router = express.Router();

router.use("/", require("./index"));

router.use("*", require("./errors"));

module.exports = router;
