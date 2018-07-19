const express = require('express');
const router = express.Router();
const multer = require('multer');
const Admin = require('../models/Admin').Admin;
const Country = require('../models/Country');
const State = require('../models/State');
const csrf = require('csurf');
const Auth = require("../middlewares/auth");


const csrfProtection = csrf({ cookie: true });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profile');
    },
    filename: function (req, file, cb) {
      fileExt = file.mimetype.split('/')[1];
      if (fileExt == 'jpeg'){ fileExt = 'jpg';}
      fileName = req.user._id + '-' + Date.now() + '.' + fileExt;
      cb(null, fileName);
    }
})

var profile = multer({ storage: storage });

router.get('/dashboard', Auth, (req, res) => {
    res.render('dashboard', { layout: 'dashboard' });
});

router.get('/logout', Auth, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', csrfProtection, Auth, async (req, res) => {
    const countries = await Country.find({});
    const states = await State.find({});
    res.render('profile', { layout: 'dashboard', _csrf: req.csrfToken(), countries, states });
});

router.post('/profile', profile.single('avatar'), csrfProtection, Auth, (req, res) => {
    Admin.findById(req.user._id)
        .then(user => {
            if(!user) {
                res.json({
                    success: false,
                    message: "User not found"
                });
            }
            else {
                user.first_name = req.body.first_name;
                user.last_name = req.body.last_name;
                user.mobile_no = req.body.mobile_no;
                user.avatar = (req.file === undefined) ? req.user.avatar : `/profile/${req.file.filename}`;
                user.save();
                res.json({
                    success: true,
                    message: "Basic information updated successfully"
                });
            }
        })
        .catch(err => {
            res.json({
                success: false,
                message: "Please try again"
            });
        })
});

router.post('/address', csrfProtection, Auth, (req, res) => {
    Admin.findById(req.user._id)
        .then(user => {
            if(!user) {
                res.json({
                    success: false,
                    message: "User not found"
                });
            }
            else {
                user.address = req.body.address;
                user.country = req.body.country;
                user.state = req.body.state;
                user.city = req.body.city;
                user.pincode = req.body.pincode;
                
                user.save();
                res.json({
                    success: true,
                    message: "Address updated successfully"
                });
            }
        })
        .catch(err => {
            res.json({
                success: false,
                message: "Please try again"
            });
        })
});

module.exports = router;