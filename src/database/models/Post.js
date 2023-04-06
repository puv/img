const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postID: { type: String, required: true },
    images: { type: Array, required: true },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;