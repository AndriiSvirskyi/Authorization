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
        const status = 'User'
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
            status,
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
        let currentDate = new Date();
        const usersMongo = await User.find({});
        jwtToken.verify(token, config.secret, (err, authData)=>{
            if(err){
                res.status(401)
            } else {
                let permission;
                let email;
                let name;
                let birthday;
                let users = [];
                User.findById(authData.sub, async (err, adventure) => {
                    permission = adventure.status
                    usersMongo.forEach((user)=>{
                        let years;
                        email = user.email;
                        name = user.name;
                        birthday = user.birthday;
                        if(birthday){
                            birthday = user.birthday.split('.');
                            years = currentDate.getFullYear() - birthday[2];
                            if(currentDate.getMonth < birthday[1]){
                                ++years
                            }else if(currentDate.getMonth == birthday[1]){
                                if(currentDate.getDate() >= birthday[0]){
                                    ++years
                                }
                            }
                        }else{
                            years = '';
                        }
                        let status = user.status
                        users.push({ email : email, name : name, birthday : years, status : status })
                    });
                    res.send({users, permission})
                });
            }
        });
    } 
    catch(err) {
        next(err);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        // validation token 
        let token;
        if(getPasswort(req.body.token)){
            jwtToken.verify(req.body.token, config.secret, (err, authData)=>{
                if(err){
                    res.status(401)
                } else { 
                    User.findById(authData.sub, async (err, adventure) => {
                        await bcrypt.compare(req.body.password, adventure.password, function(err, valid) {
                            if(valid){
                                let email = adventure.email;
                                let password = req.body.newPassword;
                                const user = new User({
                                    email,
                                    password
                                });
                                token = getToken(user);
                                User.findByIdAndUpdate({ _id : authData.sub }, { $set: { password: req.body.newPassword }}, { new: true })
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

exports.addInformation = async (req, res, next) => {

    try {
        // validation token 
        if(getPasswort(req.body.token)){
            jwtToken.verify(req.body.token, config.secret, (err, authData)=>{
                if(err){
                    res.status(401)
                } else {
                    let status = "User";
                        if(req.body.name === "admin"){ status = "admin" };
                    if(req.body.name && req.body.birthday) User.findByIdAndUpdate({ _id : authData.sub }, { $set: { name: req.body.name, birthday : req.body.birthday, status: status }}, { new: true },()=>{})
                    if(req.body.name) User.findByIdAndUpdate({ _id : authData.sub }, { $set: { name: req.body.name, status: status }}, { new: true },()=>{})
                    if(req.body.birthday) User.findByIdAndUpdate({ _id : authData.sub }, { $set: { birthday : req.body.birthday, status: status }}, { new: true },()=>{})
                };
            });
        }
        res.send({ message : "Information added" })
    }
    catch(err) {
        next(err);
    }
}

exports.permission = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1]
            if(getPasswort(token)){
                jwtToken.verify(token, config.secret, (err, authData)=>{
                    if(err){
                        res.status(401)
                    } else { 
                        User.findById(authData.sub, async (err, adventure) => {
                            res.send({permission : adventure.status})
                        });
                    }
                });
            } else {
                res.send({permission : false})
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

exports.deleteUser = async (req, res, next) => {
    try {
        await User.findOneAndDelete({ email: req.body.user }, function(err, result){});
        const usersMongo = await User.find({});
        let users = []
        let currentDate = new Date();
        usersMongo.forEach((user)=>{
            let years;
            let email = user.email;
            let name = user.name;
            let birthday = user.birthday;
            if(birthday){
                birthday = user.birthday.split('.');
                years = currentDate.getFullYear() - birthday[2];
                if(currentDate.getMonth < birthday[1]){
                    ++years
                }else if(currentDate.getMonth == birthday[1]){
                    if(currentDate.getDate() >= birthday[0]){
                        ++years
                    }
                }
            }else{
                years = '';
            }
            let status = user.status
            users.push({ email : email, name : name, birthday : years, status : status })
        });
        
        console.log(users)
        res.send({message : `User with email ${req.body.user} - deleted`, users : users})
        }
    catch(err) {
        next(err);
    }
};