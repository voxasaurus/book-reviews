const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'username' },
        async (username, password, done) => {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Username not registered' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};
