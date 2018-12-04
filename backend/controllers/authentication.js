const jwt = require('jwt-simple');
const jwtToken = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

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
        if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
            return res.status(422).send({ message: 'The password must contain a minimum of 6 characters, including 1 character, 1 uppercase letter' });
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
        let users = [];
        const usersMongo = await User.find({});
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

exports.changePassword = async (req, res, next) => {
    try {
        // validation token 
        let token;
        console.log(req.body.password)
        if(getPasswort(req.body.token)){
            jwtToken.verify(req.body.token, config.secret, (err, authData)=>{
                if(err){
                    res.status(401)
                } else { 
                    User.findById(authData.sub, async (err, adventure) => {
                        console.log(adventure)
                        await bcrypt.compare(req.body.password, adventure.password, function(err, valid) {
                            if(valid){
                                let email = adventure.email;
                                let password = req.body.newPassword;
                                const user = new User({
                                    email,
                                    password
                                });
                                token = getToken(user);
                                adventure.set({ password: req.body.newPassword });
                                adventure.save(function (err, complete) {});
                                res.json({ token : token, message: "Your password has changed" })
                            }else{
                                return res.status(422).send({ message: 'not password' })
                            }
                        });
                    });
                };
            })
        }  
    } 
    catch(err) {
        next(err);
    }
};

exports.permission = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1]
        if(token){
            getPasswort(token) ? res.send({token, "permission" : true}) : res.send({"permission" : false})
        }else{
            res.send({"permission" : false})
        } 
    } 
    catch(err) {
        next(err);
    }
};

exports.recovery = (req, res, next) => {
    try {
        let password = Math.random().toFixed(7)*10000000;   
        User.find({ email: req.body.email}, async (err, docs) => {
            docs[0].set({ password: password });
            docs[0].save(function (err, complete) {});
        })
        nodemailer.createTestAccount((err, account) => {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'rollerdemon4@gmail.com',
                    pass: 'rollerwar1' 
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let mailOptions = {
                from: 'rollerdemon4@gmail.com',
                to: 'andriisvirskyi@gmail.com',
                subject: "your new password",
                text: password + '',
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });
        res.send(req.body)
    } 
    catch(err) {
        next(err);
    }
};