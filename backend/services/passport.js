const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const config = require('../config');

    const localOptions = {
    usernameField: 'email'
    };
    // find user
    const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        const isMatch = await user.comparePassword(password);

        if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
        }
        if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch(err) {
        done(message);
    }
    });

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };

    // 
    const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        done(null, user ? user : false);
    } catch(err) {
        done(err);
    }
    });

    passport.use(localStrategy);
    passport.use(jwtStrategy);
