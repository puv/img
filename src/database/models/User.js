const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile: {
        username: { type: String, required: true },
        avatar: { type: String, default: null },
    },
    posts: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;