const Router = require("express").Router;
const Post = require("../database/models/Post");
const router = Router();

router.get("/:id", (req, res) => {
  Post.findOne({ postID: req.params.id })
    .then((post) => {
      if (!post) {
        return res.redirect("/not-found");
      } else {
        return res.render("pages/post", {
          postID: req.params.id,
          images: post.images,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("/not-found");
    });
});

module.exports = router;
