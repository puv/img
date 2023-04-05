const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const ObjectId = mongoose.Types.ObjectId;

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

        if (_db.listCollections({ name: 'users' }).hasNext()) {
            console.log("Collection USERS exists");
        } else {
            console.log("Collection USERS does not exist");

            const user = new User();

            user.save(function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('User created successfully!');
                }
            });
        }

        let userCount = await User.countDocuments();
        console.log("Table USERS Loaded: " + userCount + " results");
        return _db;
    }
}

module.exports = db;