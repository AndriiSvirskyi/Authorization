const routes = require('express').Router();
const passport = require('passport');
require('./services/passport');

const Authentication = require('./controllers/authentication');
const requireSignin = passport.authenticate('local', { session: false,  failureFlash: true });
const requireAuth = passport.authenticate('jwt', { session: false,  failureFlash: true });

routes.get('/public', (req, res) => res.send({ public: true }));
routes.post('/signup', Authentication.signup);
routes.post('/signin', requireSignin, Authentication.signin);
routes.get('/protected', requireAuth, (req, res) => res.send({ user: req.user }));

module.exports = routes;
