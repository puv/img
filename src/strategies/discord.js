const passport = require("passport");
const { Strategy } = require("passport-discord");
const User = require("../database/models/User");
const dotenv = require("dotenv");
dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = User.findById(id);
        if (!user) throw new Error("User not found");
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
});


passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_CLIENT_CALLBACK,
            scope: ["identify", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ userID: profile.id });
                if (!user) {
                    user = await User.create({
                        userID: profile.id,
                        email: profile.email,
                        profile: {
                            username: profile.username,
                            avatar: profile.avatar,
                        }
                    });
                    user.save();
                } else {
                    user = await User.findOneAndUpdate({ userID: profile.id }, {
                        email: profile.email,
                        profile: {
                            username: profile.username,
                            avatar: profile.avatar,
                        }
                    });
                }

                return done(null, user);
            } catch (err) {
                console.log(err);
                return done(err, null);
            }
        }
    )
)
