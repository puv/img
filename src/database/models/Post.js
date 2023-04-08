const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postID: { type: String, required: true },
    images: { type: Array, required: true },
    info: {
        title: { type: String, default: null },
        description: { type: String, default: null },
        author: { type: String, default: null },
        createdAt: { type: Date, default: Date.now() },
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;