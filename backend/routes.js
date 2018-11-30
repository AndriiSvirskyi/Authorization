const routes = require('express').Router();
const passport = require('passport');
require('./services/passport');

const Authentication = require('./controllers/authentication');
const requireSignin = passport.authenticate('local', { session: false,  failureFlash: true });

routes.get('/public', (req, res) => res.send({ public: true }));
routes.post('/signup', Authentication.signup);
routes.post('/signin', requireSignin, Authentication.signin);
routes.get('/users', Authentication.getUsers);
routes.post('/changepassword', Authentication.changePassword);
routes.get('/permission', Authentication.permission);
routes.post('/recovery', Authentication.recovery);

module.exports = routes;
