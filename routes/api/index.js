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
const Admin = require('../../models/Admin').Admin;
var fs = require('fs');
var multer = require('multer');
var base64ToImage = require('base64-to-image');
//for sending email
// const sendmail = require('sendmail')();
const Mailjet = require('node-mailjet').connect('f6419360e64064bc8ea8c4ea949e7eb8', 'fde7e8364b2ba00150f43eae0851cc85');
//end

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
        return res.json({ success: false, code: 404, message: 'Username or Password is wrong.'});
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

router.post('/profile/discipline', passport.authenticate('jwt', {session:false}), async (req,res) => {
  var user = await User.findOne({ _id: req.user.id});

  const discipline = {
    lingerie: req.body.lingerie,
    actors: req.body.actors,
    glamour: req.body.glamour,
    catalog: req.body.catalog,
    commercial: req.body.commercial,
    event: req.body.event,
    foot: req.body.foot,
    video: req.body.video,
    petite: req.body.petite
  };
  user.discipline.unshift(discipline);
  user.save();
  res.json({
    success: true,
    code: 200,
    message: "Discipline uploaded successfully"
  });
});

router.post('/profile/trust', passport.authenticate('jwt', {session:false}), async (req,res) => {
  var user = await User.findOne({ _id: req.user.id});
  
  const trust = {
    social_verification: req.body.social_verification,
    mobile_verification: req.body.mobile_verification,
    reviews: req.body.reviews
  };

  user.trust.unshift(trust);
  user.save();
  res.json({
    success: true,
    code: 200,
    message: "Trust uploaded successfully"
  });
});

router.post('/profile/general-info-edit', passport.authenticate('jwt', {session: false}), async (req,res) =>{
  var user = await User.findOne({ _id: req.user.id});
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.email = req.body.email;
  user.description = req.body.description;
  user.location = req.body.location;
  user.city = req.body.city;

  if(user.save()){
    res.json({
      success: true,
      code: 200,
      message: "Edit successfully"
    });
  }else{
    res.json({
      success: false,
      code: 300,
      message: "Edit failed."
    });
  }
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

router.post('/all-user-list', passport.authenticate('jwt', {session: false}), async (req,res) =>{
  var user = await User.findOne({_id: req.user.id});
  var user_list = await User.find({
    _id :{
      $nin: user.id
    }
  });

  if(user_list.length > 0) {
    res.json({
      success: true,
      all_model_list: user_list
    });
  }else{
    res.json({
      success: false,
      message: "No users found."
    });
  }
});

router.post('/user-serach-result' , passport.authenticate('jwt', {session : false}), async (req,res) => {
  
  var user_search_result = await User.find().or(
    [
      {
        first_name: { $regex: '.*' + req.body.search_text + '.*', $options : 'i' }
      },
      {
        last_name: { $regex: '.*' + req.body.search_text + '.*', $options : 'i' }
      },
      {
        location: { $regex: '.*' + req.body.search_text + '.*', $options : 'i' }
      },
      {
        city: { $regex: '.*' + req.body.search_text + '.*', $options : 'i' }
      }
    ]
  ).and([
    {
      _id :{
        $nin: req.user.id
      }
    }
  ]).populate('Industry');
  
  if(user_search_result.length > 0){
    res.json({
      success: true,
      code: 200,
      data: user_search_result
    });
  }else{
    res.json({
      success: false,
      code: 300,
      message: "User not found"
    });
  }
  
});

router.post('/forgot-password', async (req,res) => {
  var user_email = req.body.email;
  var user_details = await User.findOne({
    email: user_email
  });

  if(user_details){

    var digits = 7;	
		var numfactor = Math.pow(10, parseInt(digits-1));	
    var randomNum =  Math.floor(Math.random() * numfactor) + 1;	

    var email_body = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
        <title>Forgot Password</title>
    
        <style>
    
            body {
    
                background-color: #FFFFFF; padding: 0; margin: 0;
    
            }
    
        </style>
    
    </head>
    
    <body style="background-color: #FFFFFF; padding: 0; margin: 0;">
    
    <table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">
    
        <tr>
    
            <td align="center" valign="top">
    
                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">
    
                    <!-- Logo -->
    
                    <tr>
    
                        <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-bottom: 10px;">
    
                            <img alt="" border="0" src="/assets/images/common/demo/logo.png" title="" class="sitelogo" width="60%" style="max-width:250px;" />
    
                        </td>
    
                    </tr>
    
                    <!-- Title -->
    
                    <tr>
    
                        <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">
    
                            <span style="font-size: 18px; font-weight: normal;">FORGOT PASSWORD</span>
    
                        </td>
    
                    </tr>
    
                    <!-- Messages -->
    
                    <tr>
    
                        <td align="left" valign="top" colspan="2" style="padding-top: 10px;">
    
                            <span style="font-size: 12px; line-height: 1.5; color: #333333;">
    
                              Hi ${user_details.first_name}, <br/>    
                              We have sent you this email with OTP in response to your request to reset your password on Model Management System.
    
                                <br/><br/>
    
                                To reset your password for Model Management System login, please copy the below OTP: 
                                <br/>

                                <b>${randomNum}</b>
    
                                <br/><br/>
    
                                We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your Change password page and clicking on the "Change Password" link.
    
                                <br/><br/>
    
                                If you need help, or you have any other questions, feel free to email info@wrctpl.com, or call customer service toll-free at +91-1234567890.
    
                                <br/><br/>
    
                                Model Management System Customer Service
    
                            </span>
    
                        </td>
    
                    </tr>
    
                </table>
    
            </td>
    
        </tr>
    
    </table>
    
    </body>
    
    </html> `;

    var sendEmail = Mailjet.post('send');
 
    var emailData = {
        'FromEmail': 'info@wrctpl.com',
        'FromName': 'Model Management System',
        'Subject': 'Forgot Password OTP',
        'Html-part': email_body,
        'Recipients': [{'Email': req.body.email}]
    };
    
    if(sendEmail.request(emailData)) {
      user_details.otp = randomNum;
      if(user_details.save()) {
        res.json({
          success: true, 
          code: 200, 
          message: 'Email send successfully to the user.'
        });
      }
    }

  }else{
    res.json({
      success: false, 
      code: 404, 
      message: 'Email not found.'
    });
  }
});

router.post('/otp-verify-and-update-pw', async (req,res) => {
  var otp = req.body.otp;

  var verify_otp_result = await User.findOne({otp});
  if(verify_otp_result){
    var new_password = req.body.new_password;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(new_password, salt, (err, hash) => {
        if (err) throw err;
        new_password_with_hashing = hash;
        
        verify_otp_result.password = new_password_with_hashing;

        if(verify_otp_result.save()){
          return res.json({
            success: true,
            code:200,
            message: "Password update successfully."
          });
        }
      });
    });
  }else{
    res.json({
      success: false,
      code: 300,
      message: "OTP does not match."
    });
  }
});

router.post('/profile/image-upload', passport.authenticate('jwt', {session: false}), async (req,res) => {
  var user = await User.findOne({_id: req.user.id});

  var base64Str = req.body.profile_image;

  let base64ImageMimeType = base64Str.split(';base64,');
  var type = base64ImageMimeType[0].split(':image/');

  var path ='public/app_profile_image/';

  var imageFileName = req.user.id + '-' + Date.now();
  var optionalObj = {'fileName': imageFileName, 'type': type[1]};
  var uploadImage = base64ToImage(base64Str,path,optionalObj);

  var full_image_path = req.headers.host + '/app_profile_image/' + uploadImage.fileName;

  user.avatar = full_image_path;

  if(user.save()){
    res.json({
      success: true,
      code:200,
      message: "Profile image uploaded successfully."
    });
  }else{
    res.json({
      success: false,
      code: 300,
      message: "Something went wrong."
    });
  }
});


module.exports = router;

