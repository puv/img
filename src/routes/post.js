const Post = require("../database/models/Post");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
    imageLocations = [];

    Post.findOne({ postID: req.params.id }).then((post) => {
        if (!post) return res.redirect('/404')
        for (let image of post.images) {
            imageLocations.push(`/uploads/${image}`);
        }

        res.render("pages/post", {
            postID: post.postID,
            images: imageLocations,
        });
    });
});

module.exports = router;
