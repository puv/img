const Router = require("express").Router;
const router = Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
