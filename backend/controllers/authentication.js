const jwt = require('jwt-simple');
const jwtToken = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

const getToken = (user) => {
const timestamp = Date.now();

    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret);
};

const getPasswort = (token) => {
    let authorization;
    if(typeof token !== undefined) {
        jwtToken.verify(token, config.secret, (err, authData)=>{
            if(err){
                authorization = false;
            } else {
                if(User.findOne( authData.sub )){
                    authorization = true;
                } else {
                    authorization = false;
                }
            };
        })
    } else {
        authorization = false;
    }
    return authorization;
}

exports.signin = (req, res, next) => {
    res.send({ token: getToken(req.user) });
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
    } 
    catch(err) {
        next(err);
    }
};
exports.getUsers = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1]
        const usersMongo = await User.find({});
        let users = [];
        usersMongo.forEach((user)=>{
            let email = user.email;
            let password = user.password
            users.push({email : email, password : password})
        });

        // validation token 
        getPasswort(token) ? res.send(users) : res.status(401)

    } 
    catch(err) {
        next(err);
    }
};