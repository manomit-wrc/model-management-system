const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const secretOrKey = require('../../config/keys').secretOrKey;

const cleanCache = require('../../middlewares/cleanCache');

const User = require('../../models/User').User;
const Industry = require('../../models/Industry').Industry;

router.post('/signup',  async (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
         return res.json({ success: false, code: 403, message: 'Email already exists'});
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' // Default
          });
    
          const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            avatar,
            password: req.body.password
          });
    
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                    const payload = { id: user._id, email: user.email, avatar: user.avatar }; // Create JWT Payload

                    // Sign Token
                    jwt.sign(
                    payload,
                    secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        return res.json({
                        success: true,
                        token: 'Bearer ' + token,
                        code: 200
                        });
                    }
                    );
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    
    
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
        return res.json({ success: false, code: 404, message: 'User not found'});
    }

    // Check Password
    
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user._id, email: user.email, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            return res.json({
              success: true,
              token: 'Bearer ' + token,
              code: 200
            });
          }
        );
      } else {
        return res.json({ success: false, code: 404, message: 'Password not found'});
      }
    });
  });
    
});

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    var user = await User.findOne({ _id: req.user.id});
    
    res.json({
        success: true,
        code: 200,
        user
    });
});

router.get('/industries', async (req, res) => {
    const data = await Industry.find({});
    res.send({
      success: true,
      industries: data
    });
});

router.post('/profile/videos', passport.authenticate('jwt', { session: false }) , async (req, res) => {
  var user = await User.findOne({ _id: req.user.id});
  user.videos = req.body.videos;
  user.save();
  res.json({
    success: true,
    code: 200,
    message: "Videos uploaded successfully"
  });
});

router.post('/profile/info', passport.authenticate('jwt', { session: false }), async (req, res) => {
  var user = await User.findOne({ _id: req.user.id});

  const user_info = {
    ethencity: req.body.ethencity,
    gender: req.body.gender,
    height: req.body.height,
    eyes: req.body.eyes,
    dress: req.body.dress,
    shoes: req.body.shoes
  };
  user.info.unshift(user_info);
  user.save();
  res.json({
    success: true,
    code: 200,
    message: "Info uploaded successfully"
  });
});

router.post('/change-password', passport.authenticate('jwt', {session : false}), (req,res) => {
  var new_password_with_hashing;
  var old_password = req.body.old_password;
  

  bcrypt.compare(old_password, req.user.password).then(isMatch => {
    if (isMatch) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.new_password, salt, (err, hash) => {
          if (err) throw err;
          new_password_with_hashing = hash;

          User.updateOne({
              _id: req.user.id //matching with table id
            },{
              $set: {
                password: new_password_with_hashing
              }
            }).then(function (result) {
              if(result) {
                return res.json({
                  success: true,
                  code:200,
                  message: "Password changed successfully."
                });
              }
            });
        });
      });
    } else {
      return res.json({ success: false, code: 404, message: 'Old Password does not matched.'});
    }
  });
});

router.get('/all-list-of-user', passport.authenticate('jwt', { session:false }), (req,res) => {
  User.find()
});

module.exports = router;

