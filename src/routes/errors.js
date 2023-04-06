const Router = require("express").Router;
const router = Router();

router.get("*", (req, res) => {
  res.render("pages/errors/_404");
});

router.all("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
