const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Post = require("./models/Post");

dotenv.config();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


const db = {
    init: async (callback) => {
        console.log("Initializing Database");

        let instance = await mongoose.connect(process.env.DB_URI, options);
        _db = instance.connection.db;
        console.log("Database Initialized");

        if (!_db.listCollections({ name: "users" }).hasNext()) new User().save();
        if (!_db.listCollections({ name: "posts" }).hasNext()) new Post().save();

        let userCount = await User.countDocuments();
        let postCount = await Post.countDocuments();
        console.log(`Table USERS Loaded: ${userCount} results`);
        console.log(`Table POSTS Loaded: ${postCount} results`);
        return _db;
    }
}

module.exports = db;