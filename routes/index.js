const express = require('express');
const passport = require('passport');
const csrf = require('csurf');

const router = express.Router();

const csrfProtection = csrf({ cookie: true })

router.get('/', csrfProtection, (req, res) => {
    var msg = req.flash('loginMessage')[0];
    res.render('login', { layout: 'login', _csrf: req.csrfToken(), msg});
});
router.post('/', csrfProtection, passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}), (req, res) => {
   
});

module.exports = router;