const jwt = require('jwt-simple');
const jwtToken = require('jsonwebtoken');
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
        let token = req.headers.authorization
        const usersMongo = await User.find({});
        let users = [];
        usersMongo.forEach((user)=>{
            let email = user.email;
            let password = user.password
            users.push({email : email, password : password})
        })
        console.log(token)
        if(typeof token !== undefined){
            jwtToken.verify(token.split(' ')[1], config.secret, (err, authData)=>{
                if(err){
                    res.sendStatus(401);
                }else{
                    if(User.findOne( authData.sub )){
                        res.send(users)
                    }else{
                        res.sendStatus(401)
                    }
                }
            })
            next();
            } else {
                res.sendStatus(401);
            }
        
        
    } 
    catch(err) {
        next(err);
    }
};
