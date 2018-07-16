const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User').User;
const Admin = require('../models/Admin').Admin;

const secretOrKey = require('./keys').secretOrKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;



module.exports = (passport) => {

    passport.serializeUser((admin, done) => {
      
      done(null, admin._id);
    });

    passport.deserializeUser((id, done) => {
      
      Admin.findById(id).then(admin => {
        done(null, admin);
      });
    });

    passport.use('local-login', 
      new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      }, (req, email, password, done) => {
          if (req.body.remember_me) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
          } else {
            req.session.cookie.expires = false;
          }
          Admin.findOne({ email })
            .then(admin => {
              
              if (!admin) {
                
                return done(null, false, req.flash('loginMessage', 'Wrong Username or password'));
              }
              bcrypt.compare(password, admin.password).then(isMatch => {
                if (isMatch) {
                  return done(null, admin);
                } else {
                  return done(null, false, req.flash('loginMessage', 'Wrong Username or password'));
                }
            });
            }).catch(err => {
              console.log(err);
              return done(null, false, req.flash('loginMessage', 'Something wrong. Please try again.'));
            });
      })
    )

    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })
    );
};