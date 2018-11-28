const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

const compareToken = (user)=>{
    return jwt.decode(getToken(user),config.secret)
}
const getToken = (user) => {
const timestamp = Date.now();

    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret);
};

exports.signin = (req, res, next) => {
    res.send({ token: getToken(req.user), tokenserver: compareToken(req.user)});
};

exports.signup = async (req, res, next) => {
try {
    const { email, password } = req.body;

    if (!email || !password) {
    return res.status(422).send({ message: 'You must provide email and password' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
    return res.status(422).send({ message: 'Email is in use' });
    }

    const user = new User({
    email,
    password
    });

    await user.save();

    res.json({ token: getToken(user) });
} catch(err) {
    next(err);
}
};
