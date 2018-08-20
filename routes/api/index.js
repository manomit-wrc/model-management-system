const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const _ = require('lodash');
const secretOrKey = require('../../config/keys').secretOrKey;
const crypto = require('crypto');

const User = require('../../models/User').User;
const Industry = require('../../models/Industry').Industry;
const Admin = require('../../models/Admin').Admin;
const Banner = require('../../models/Banner');
const Category = require('../../models/Category');
const Brand = require('../../models/Brand');
const State = require('../../models/State');
const Country = require('../../models/Country');
const Catalog = require('../../models/Catalog');
const Discipline = require('../../models/Discipline');
const Eyes = require('../../models/Eyes');
const HairColor = require('../../models/HairColor');
const Ethnicity = require('../../models/Ethnicity');
const Job_post = require('../../models/Job_post');
var fs = require('fs');
var multer = require('multer');
var base64ToImage = require('base64-to-image');
//for sending email
const Mailjet = require('node-mailjet').connect('f6419360e64064bc8ea8c4ea949e7eb8', 'fde7e8364b2ba00150f43eae0851cc85');
//end

//for twilio
const twilio = require('../../config/keys').twilio;
//end

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile');
  },
  filename: function (req, file, cb) {
    fileExt = file.mimetype.split('/')[1];
    if (fileExt == 'jpeg'){ fileExt = 'jpg';}
    fileName = Math.floor(new Date() / 1000) + '-' + Date.now() + '.' + fileExt;
    cb(null, fileName);
  }
})

var profile = multer({ storage: storage });

var PortfolioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/portfolio');
  },
  filename: function (req, file, cb) {
    fileExt = file.mimetype.split('/')[1];
    if (fileExt == 'jpeg'){ fileExt = 'jpg';}
    fileName = Math.floor(new Date() / 1000) + '-' + Date.now() + '.' + fileExt;
    cb(null, fileName);
  }
});

var portfolio = multer({ storage: PortfolioStorage });

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
          const activation_link = crypto.randomBytes(64).toString('hex');
          const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            avatar,
            password: req.body.password,
            industry: req.body.industry,
            reg_type: 'R',
            activation_link
          });
    
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  var email_body = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

                  <html xmlns="http://www.w3.org/1999/xhtml">
                  
                  <head>
                  
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  
                      <title>Registration confirmation</title>
                  
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
                  
                                          <img alt="" border="0" src="${process.env.BASE_URL}/assets/images/logo.png" title="" width="100%" />
                  
                                      </td>
                  
                                  </tr>
                  
                                  <!-- Title -->
                  
                                  <tr>
                  
                                      <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">
                  
                                          <span style="font-size: 18px; font-weight: normal;">Registration confirmation</span>
                  
                                      </td>
                  
                                  </tr>
                  
                                  <!-- Messages -->
                  
                                  <tr>
                  
                                      <td align="left" valign="top" colspan="2" style="padding-top: 10px;">
                  
                                          <span style="font-size: 12px; line-height: 1.5; color: #333333;">
                  
                                            Hi ${user.first_name}, <br/>    
                                            Please click on the below link to verify your email
                  
                                              <br/><br/>
                  
                                              <a href="${process.env.FRONT_END_URL}/verify/${user.activation_link}">Click here to verify</a>
                                              <br/>
              
                                              
                  
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
                      'Subject': 'Registration confirmation',
                      'Html-part': email_body,
                      'Recipients': [{'Email': req.body.email}]
                  };
                  
                  if(sendEmail.request(emailData)) {
                    
                    res.json({
                      success: true, 
                      code: 200, 
                      message: 'Registration completed successfully. Please check your email to verify your account'
                    });
                    
                  }
                })
                .catch(err => {
                  throw new Error("Something is not right. Please try again.");
                });
            });
          });
        }
      });
    
    
});

//for registration from app
router.post('/signup/mobile',  async (req, res) => {
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
        last_name: '',
        email: req.body.email,
        avatar : 'http:'+avatar,
        password: req.body.password,
        reg_type: 'R',
        industry : req.body.industry
      });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {

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
                    
                                            <span style="font-size: 18px; font-weight: normal;">Registration</span>
                    
                                        </td>
                    
                                    </tr>
                    
                                    <!-- Messages -->
                    
                                    <tr>
                    
                                        <td align="left" valign="top" colspan="2" style="padding-top: 10px;">
                    
                                            <span style="font-size: 12px; line-height: 1.5; color: #333333;">
                    
                                              Hi ${req.body.first_name}, <br/>    
                                              We have sent you this email with OTP in response to your request to registration on Model Management System.
                    
                                                <br/><br/>
                    
                                                To complete the registration process for Model Management System login, please copy the below OTP: 
                                                <br/>

                                                <b>${randomNum}</b>
                    
                                                <br/><br/>
                    
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
                    'Subject': 'Registration OTP',
                    'Html-part': email_body,
                    'Recipients': [{'Email': req.body.email}]
                };
                
                if(sendEmail.request(emailData)) {
                  newUser.otp = randomNum;
                  if(newUser.save()) {
                    res.json({
                      success: true, 
                      code: 200, 
                      message: 'Registration email with OTP send successfully to the user.'
                    });
                  }
                }
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  
  
});

router.post('/registration-otp-varification', async (req,res) => {
  var otp = req.body.otp;

  var verify_otp_result = await User.findOne({otp});
  if(verify_otp_result){
    verify_otp_result.status = 1;

    if(verify_otp_result.save()){
      const payload = { id: verify_otp_result._id, email: verify_otp_result.email, avatar: verify_otp_result.avatar }; // Create JWT Payload

      // Sign Token
      jwt.sign(
      payload,
      secretOrKey,
      { expiresIn: 3600 },
      (err, token) => {
          return res.json({
          success: true,
          token: 'Bearer ' + token,
          code: 200,
          message: 'Registration completed successfully'
          });
      });
    }
  }else{
    res.json({
      success: false,
      code: 300,
      message: "OTP does not match."
    });
  }
});

router.post('/login-mobile', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const industry = req.body.industry;

  // Find user by email
  User.findOne({ email, industry:industry }).then(user => {
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

router.post('/social-login', async (req,res) => {
  var email = req.body.email;
  var reg_type = req.body.reg_type;

  var user = await User.findOne({email, reg_type: 'R'});

  if(user){
    res.json({
      success: false, 
      code: 300, 
      message: 'Email already exist.'
    });
  }else{

    var already_login_with_social_app = await User.findOne({
      email,
      reg_type:{
        $nin: 'R'
      }
    });

    if(already_login_with_social_app) {
      already_login_with_social_app.first_name = req.body.full_name;
      already_login_with_social_app.last_name = '';
      already_login_with_social_app.email = req.body.email;
      already_login_with_social_app.avatar = req.body.profile_image;

      if(already_login_with_social_app.save()){
        const payload = {id: already_login_with_social_app._id, email: req.body.email, avatar: req.body.profile_image }; // Create JWT Payload
      
      // console.log(payload);
      // return false;
        // Sign Token
        jwt.sign(
        payload,
        secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
            return res.json({
              success: true,
              token: 'Bearer ' + token,
              code: 200,
              message: 'Social login successfully.'
            });
        });
      }
    }else{
      const newUser = new User({
        first_name: req.body.full_name,
        last_name: '',
        email: req.body.email,
        avatar: req.body.profile_image,
        password: ' ',
        reg_type: reg_type,
        status: 1
      });
  
      if(newUser.save()){
        const payload = {id:newUser._id, first_name: req.body.full_name, email: req.body.email, avatar: req.body.profile_image }; // Create JWT Payload
  
        // Sign Token
        jwt.sign(
        payload,
        secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
            return res.json({
              success: true,
              token: 'Bearer ' + token,
              code: 200,
              message: 'Social login successfully.'
            });
        });
      }
    }
    
  }
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
        return res.json({ success: false, code: 404, message: 'Email or Password is wrong.'});
    }

    // Check Password
    
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        if(user.status === 0) {
          return res.json({ success: false, code: 404, message: 'Account is not activated. Please contact systemd administrator'});
        }
        // User Matched
        const payload = { 
          id: user._id, 
          email: user.email, 
          avatar: user.avatar,
          first_name: user.first_name,
          last_name: user.last_name 
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 60 * 60 },
          (err, token) => {
            return res.json({
              success: true,
              token: token,
              info:user,
              code: 200
            });
          }
        );
      } else {
        return res.json({ success: false, code: 404, message: 'Email or Password is wrong.'});
      }
    });
  });
    
});

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    var user = await User.findOne({ _id: req.user.id},{password: 0, status: 0, otp: 0, activation_link: 0, reg_type:0 });
    
    res.json({
        success: true,
        code: 200,
        user
    });
});

router.post('/profile/other-user-details', passport.authenticate('jwt', { session : false}), async (req,res) => {
  var profile_id = req.body.profile_id;

  var user_details = await User.findOne({_id  : profile_id},{password: 0, status: 0, otp: 0, activation_link: 0, reg_type:0 });

  var user_images = user_details.images;
  var user_videos = user_details.videos;

  var last_two_images , last_two_videos;
  if(user_images){
    last_two_images = _.take(user_images,2);
  }else{
    last_two_images = [];
  }

  if(user_videos) {
    last_two_videos = _.take(user_videos,2);
  }else{
    last_two_videos = [];
  }

  // console.log(user_details, 'user_details');
  // console.log(user_images, 'user_images');
  // console.log(user_videos, 'user_videos');
  // console.log(last_two_images, 'last_two_images');
  // console.log(last_two_videos, 'last_two_videos');

  res.json({
      success: true,
      code: 200,
      user_details,
      last_two_images,
      last_two_videos
  });
});

router.get('/industries', async (req, res) => {
    const data = await Industry.find({});
    res.send({
      success: true,
      code: 200,
      industries: data
    });
});

router.post('/profile/video-upload', passport.authenticate('jwt', { session: false }) , async (req, res) => {
  var user = await User.findOne({ _id: req.user.id});

  var videos_link = req.body.video;
  var new_link = videos_link.replace('watch?v=', 'embed/');

  var info = {
    url: new_link,
    altTag: ''
  };

  user.videos.unshift(info);
  user.created_at = Date.now();
  user.save();
  res.json({
    success: true,
    code: 200,
    message: "Video link uploaded successfully"
  });
});

router.post('/profile/fetch-allUploadedVideo', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user = await User.findOne({ _id: req.user.id});

  var other_users_profile_id = req.body.profile_id;
  console.log(req.body.profile_id,'profile_id');

  if(other_users_profile_id != '') {
    var other_users = await User.findOne({_id: other_users_profile_id});
    if(other_users){
      res.json({
        status: true,
        code : 200,
        data : other_users.videos
      });
    }else{
      res.json({
        status: false,
        code : 300,
        message : "No recent videos link found."
      });
    }
  }
});

router.post('/profile/delete-uploadedVideos', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user = await User.findOne({ _id: req.user.id});

  var video_url = req.body.video_url;

  var video_url_array = video_url.split(",");

  for(var i = 0; i < video_url_array.length; i++){
    var index = await user.videos.url.indexOf(video_url_array[i]);
    if(index > -1) {
      user.videos.url.splice(index, 1);
      
    }
    

    if(i == video_url_array.length - 1) {
      user.save();

      res.json({
        success: true,
        code: 200,
        data: user.videos,
        message: "Video link deleted successfully. "
      });
    }
  }
});

// router.post('/profile/info', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   var user = await User.findOne({ _id: req.user.id},{
//     password: 0, otp: 0, activation_link: 0
//   });

//   console.log(user);
//   return false;

//   const user_info = {
//     ethencity: req.body.ethencity,
//     gender: req.body.gender,
//     height: req.body.height,
//     eyes: req.body.eyes,
//     dress: req.body.dress,
//     shoes: req.body.shoes
//   };
//   user.info.unshift(user_info);
//   user.save();
//   res.json({
//     success: true,
//     code: 200,
//     message: "Info uploaded successfully"
//   });
// });

// router.post('/profile/discipline', passport.authenticate('jwt', {session:false}), async (req,res) => {
//   var user = await User.findOne({ _id: req.user.id});

//   const discipline = {
//     lingerie: req.body.lingerie,
//     actors: req.body.actors,
//     glamour: req.body.glamour,
//     catalog: req.body.catalog,
//     commercial: req.body.commercial,
//     event: req.body.event,
//     foot: req.body.foot,
//     video: req.body.video,
//     petite: req.body.petite
//   };
//   user.discipline.unshift(discipline);
//   user.save();
//   res.json({
//     success: true,
//     code: 200,
//     message: "Discipline uploaded successfully"
//   });
// });

router.post('/profile/trust', passport.authenticate('jwt', {session:false}), async (req,res) => {
  var user = await User.findOne({ _id: req.user.id});
  // console.log(user);
  // return false;
  if(user){
    // console.log(user.phone_number);
    // return false;
    if(user.phone_number != '' && user.phone_number !== undefined) {
      user.trust.mobile_verification = true;
      
      user.save();
      res.json({
        success: true,
        code: 200,
        message: "Trust uploaded successfully",
        trust:{
          mobile_verification: 1
        }
      });
    }else{
      res.json({
        success: true,
        code: 200,
        // message: "Trust uploaded successfully",
        trust:{
          mobile_verification: 0
        }
      });
    }
  }else{
    res.json({
      success: false,
      code: 300,
      message: "Trust uploaded failed."
    });
  }

  
});

// router.post('/profile/general-info-edit', passport.authenticate('jwt', {session: false}), async (req,res) =>{
//   var user = await User.findOne({ _id: req.user.id});
//   user.first_name = req.body.first_name;
//   user.last_name = '';
//   // user.email = req.body.email;
//   user.description = req.body.description;
//   user.location = req.body.location;
//   user.city = req.body.city;

//   if(user.save()){
//     res.json({
//       success: true,
//       code: 200,
//       message: "Profile updated successfully."
//     });
//   }else{
//     res.json({
//       success: false,
//       code: 300,
//       message: "Edit failed."
//     });
//   }
// });

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

router.post('/all-user-list', async (req,res) =>{

  var token = req.headers['authorization'];
  console.log(token);
  // return false;
  var new_token;
  if(token == undefined || token == ''){
    new_token = '';
  }else{
    new_token = req.headers['authorization'].replace(/^Bearer\s/, '');
  }

  if(new_token == '') {
    var user_list = await User.find({
      status: 1
    },
    {
      password: 0, status: 0, otp: 0, activation_link: 0, reg_type:0 
    });

    if(user_list.length > 0) {
      res.json({
        success: true,
        all_model_list: user_list
        // height: user_list.info['height'] ? user_list.info['height'] : '0.0',
        // age : user_list.info['age'] ? user_list.info['age'] : '0',
        // weight : user_list.info['weight'] ? user_list.info['weight'] : '0',
        // heap : user_list.info['heap'] ? user_list.info['heap'] : '0'
      });
    }else{
      res.json({
        success: false,
        message: "No users found."
      });
    }
  }else{
    jwt.verify(new_token, secretOrKey, async function (err, decoded) {

      var user = await User.findOne({_id: decoded.id});
      var user_list = await User.find({
        _id :{
          $nin: decoded.id
        },
        status: 1
      }, {password: 0, status: 0, otp: 0, activation_link: 0, reg_type:0 });
      
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
  
  // var base64Str = req.body.profile_image.replace(/^data:image\/jpeg+;base64,/, "");
  base64Str1 = base64Str.replace(/ /g, '+');

  let base64ImageMimeType = base64Str1.split(';base64,');
  var type = base64ImageMimeType[0].split(':image/');

  var path ='public/app_profile_image/';

  var imageFileName = req.user.id + '-' + Date.now();
  var optionalObj = {'fileName': imageFileName, 'type': type[1]};
  var uploadImage = base64ToImage(base64Str1,path,optionalObj);

  var full_image_path = req.headers.host + '/app_profile_image/' + uploadImage.fileName;

  user.avatar = 'http://'+full_image_path;

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

router.post('/profile/portfolio-image-upload', passport.authenticate('jwt', {session : false}), async (req,res) => {
  // let portfolio_arr = [];

  var user = await User.findOne({_id: req.user.id});

  var base64Str = req.body.profile_portfolio_image;
  
  // var base64Str = req.body.profile_image.replace(/^data:image\/jpeg+;base64,/, "");
  base64Str1 = base64Str.replace(/ /g, '+');

  let base64ImageMimeType = base64Str1.split(';base64,');
  var type = base64ImageMimeType[0].split(':image/');

  var path ='public/app_portfolio_image/';

  var imageFileName = req.user.id + '-' + Date.now();
  var optionalObj = {'fileName': imageFileName, 'type': type[1]};
  var uploadImage = base64ToImage(base64Str1,path,optionalObj);

  var full_image_path = req.headers.host + '/app_portfolio_image/' + uploadImage.fileName;

  var final_link = 'http://'+full_image_path;

  var info = {
    src: final_link,
    caption: ''
  };

  user.images.unshift(info);
  user.created_at = Date.now();
  if(user.save()){
    res.json({
      success: true,
      code:200,
      message: "Image uploaded successfully."
    });
  }else{
    res.json({
      success: false,
      code: 300,
      message: "Something went wrong."
    });
  }
});

router.post('/profile/fetch-portfolio-images', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user = await User.findOne({_id: req.user.id});

  var other_users_profile_id = req.body.profile_id;
  if(other_users_profile_id != '') {
    var other_users = await User.findOne({_id: req.body.profile_id});
    if(other_users.images != '') {
      res.json({
        status: true,
        code: 200,
        data: other_users.images
      });
    }else{
      res.json({
        status: false,
        code: 300,
        message : "No records found."
      });
    }
  }else{
    if(user){
      if(user.images != '') {
        res.json({
          status: true,
          code: 200,
          data: user.images
        });
      }else{
        res.json({
          status: false,
          code: 300,
          message : "No records found."
        });
      }
    }
  }
});

router.post('/profile/portfolio-image-details', passport.authenticate('jwt', {session : false}), async (req,res) => {

});

router.post('/profile/delete-portfolio-images', passport.authenticate('jwt', {session : false}), async (req,res) => {
  const user = await User.findById(req.user.id);
  // var image_url = req.body.imageUri;
  var image_url ='http://mms.wrctpl.com/app_portfolio_image/5b7aafa931b0353b7197f35b-1534771217551.jpeg';
  var make_image_array = image_url.split(",");

  // fs.unlinkSync(`${process.env.DOCUMENT_ROOT}/${arr[arr.length - 1]}`);
  // const images = _.filter(user.images, img => img.src !== req.body.imageUri.src);
  // user.images = images;

  for(var i = 0; i < make_image_array.length; i++){
    // var index = await user.images.indexOf(make_image_array[i]);
    // console.log(index);
    // return false;
    // if(index > -1) {
    //   user.images.splice(index, 1);
      
    // }

    fs.unlinkSync(`${process.env.DOCUMENT_ROOT}/${make_image_array[make_image_array.length - 1]}`);
    const images = _.filter(user.images, img => img.src !== make_image_array[i]);
    console.log(images);
    user.images = images;
    user.save();

    if(i == make_image_array.length - 1) {
      res.json({
        success: true,
        code: 200,
        data: user.images,
        message: "Image deleted successfully. "
      });
    }
  }
});

router.get('/home-page-details', async (req, res) => {
  const banner = await Banner.find({});
  const categories = await Category.find({});
  const brands = await Brand.find({});
  res.json({
    success: true,
    banner: banner,
    categories: categories,
    brands: brands
  });
});

router.post('/check-activation', async (req, res) => {
  
  const user = await User.findOne({
    activation_link: req.body.activation_id
  });
  
  if(user) {
    if(user.status === 1) {
      res.json({
        success: false,
        message: "Your account is already activated. Please login to cointinue."
      })
    }
    else {
      res.json({
        success: true,
        message: `Hey ${user.first_name} ${user.last_name}, We received a request to set your email to ${user.email}. If this correct, please confirm by clicking the button bellow.`
      })
    }
  }
  else {
    res.json({
      success: false,
      message: "Sorry, system can't activate your account."
    })
  }
});

router.post('/verify-activation', async(req, res) => {
  const user = await User.findOne({
    activation_link: req.body.activation_id
  });
  if(user) {
    user.status = 1;
    user.save();
    const payload = { 
      id: user._id, 
      email: user.email, 
      avatar: user.avatar,
      first_name: user.first_name,
      last_name: user.last_name 
    }; // Create JWT Payload
  
    // Sign Token
    jwt.sign(
      payload,
      secretOrKey,
      { expiresIn: 60 * 60 },
      (err, token) => {
        return res.json({
          success: true,
          token: token,
          info: user,
          code: 200
        });
      }
    );
  }
  else {
    res.json({
      success: true,
      message: "Something is not right. Please try again"
    });
  }
});

router.post('/user-auth-token', passport.authenticate('jwt', { session: false }), async (req, res) => {
  
  res.json({
    success: true,
    user: req.user
  });
})

router.post('/upload-profile-image', profile.single('avatar'), passport.authenticate('jwt', { session: false }), async (req, res) => {
  const user = await User.findById(req.user.id);
  user.avatar = `${process.env.BASE_URL}/profile/${req.file.filename}`;
  user.save();
  const payload = { 
    id: user._id, 
    email: user.email, 
    avatar: user.avatar,
    first_name: user.first_name,
    last_name: user.last_name 
  }; // Create JWT Payload

  // Sign Token
  jwt.sign(
    payload,
    secretOrKey,
    { expiresIn: 60 * 60 },
    (err, token) => {
      return res.json({
        success: true,
        token: token,
        info: user,
        code: 200
      });
    }
  );

});

router.post('/upload-portfolio-images', portfolio.any('images'), passport.authenticate('jwt', { session: false }), async(req, res) => {
  let portfolio_arr = [];
  const user = await User.findById(req.user.id);
  if(user) {
    portfolio_arr = user.images;
    console.log(portfolio_arr);
    for(var i=0; i<req.files.length; i++) {
      portfolio_arr.push({
        src: `${process.env.BASE_URL}/portfolio/${req.files[i].filename}`,
        caption: `Portfolio-${i}`
      })
    }
    user.images = portfolio_arr;
    user.save();
    return res.json({
      success: true,
      user_details: user
    });
    
  }

})

router.post('/upload-portfolio-videos', portfolio.any('videos'), passport.authenticate('jwt', { session: false }), async(req, res) => {
  let portfolio_arr = [];
  const user = await User.findById(req.user.id);
  if(user) {
    portfolio_arr = user.videos;
    console.log(portfolio_arr);
    for(var i=0; i<req.files.length; i++) {
      portfolio_arr.push({
        url: `${process.env.BASE_URL}/portfolio/${req.files[i].filename}`,
        altTag: `Video-${i}`
      })
    }
    user.videos = portfolio_arr;
    user.save();
    return res.json({
      success: true,
      user_details: user
    });
    
  }

})

router.post('/login-with-google', async(req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(user) {
    const payload = { 
      id: user._id, 
      email: user.email, 
      avatar: user.avatar,
      first_name: user.first_name,
      last_name: user.last_name 
    }; // Create JWT Payload

    // Sign Token
    jwt.sign(
      payload,
      secretOrKey,
      { expiresIn: 60 * 60 },
      (err, token) => {
        return res.json({
          success: true,
          token: token,
          info: user,
          code: 200
        });
      }
    );
  }
  else {
    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      avatar: req.body.avatar,
      password: '',
      reg_type: 'G',
      social_id: req.body.social_id
    });

    newUser.save().then(user => {
      const payload = { 
        id: user._id, 
        email: user.email, 
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name 
      }; // Create JWT Payload

      // Sign Token
      jwt.sign(
        payload,
        secretOrKey,
        { expiresIn: 60 * 60 },
        (err, token) => {
          return res.json({
            success: true,
            token: token,
            info: user,
            code: 200
          });
        }
      );
    })
  }
})

router.post('/mobile_number_verification', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user = await User.findOne({_id: req.user.id});
  if(user){
    var user_phone_number;
    var str1 = req.body.phone_number;
    var str2 = "+";
    if(str1.indexOf(str2) != -1){
      user_phone_number = str1;
    }else{
      user_phone_number = "+" + str1;
    }

    var digits = 7;	
    var numfactor = Math.pow(10, parseInt(digits-1));	
    var randomNum =  Math.floor(Math.random() * numfactor) + 1;	

    const accountSid = twilio.TWILIO_ACCOUNT_SID;
    const authToken = twilio.TWILIO_AUTH_TOKEN;
    var client = require('twilio')(accountSid,authToken);

    try{
      var send_sms = await client.messages.create({
        from: '+12564877913', //twilio trail number
        to: user_phone_number, //twilio verified number
        body: `Your OTP is ${randomNum} for mobile number verification.`,
        statusCallback: 'http://requestb.in/1234abcd'
      });

      if(send_sms.status == 'queued'){
        user.otp = randomNum;
        if(user.save()){
          res.json({
            status: true,
            code: 200,
            message: "OTP send successfully."
          });
        }
      }
    }catch(e){
      console.log(e);
      res.json({
        status: false,
        code: 300,
        message: "Mobile number is wrong."
      });
    }
  }
});

router.post('/mobile_number_otp_verification', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user = await User.findOne({_id : req.user.id});
  var otp = req.body.otp;
  var ph_no = req.body.phone_number;

  var ph_no_match = await User.findOne({otp : otp});
  if(ph_no_match){
    user.phone_number = ph_no;
    if(user.save()){
      res.json({
        status: true,
        code: 200,
        message : "Mobile number verification successfully."
      })
    }
  }else{
    res.json({
      status: false,
      code: 300,
      message : "OTP doesn't match."
    })
  }
});

router.get('/user-details', passport.authenticate('jwt', { session: false }), async(req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    success: true,
    user_details: user
  });
})

router.post('/remove-portfolio-image', passport.authenticate('jwt', { session: false }), async(req, res) => {
  const user = await User.findById(req.user.id);
  const arr = req.body.imageUri.src.split("/");
  fs.unlinkSync(`${process.env.DOCUMENT_ROOT}/${arr[arr.length - 1]}`);
  const images = _.filter(user.images, img => img.src !== req.body.imageUri.src);
  user.images = images;
  user.save();
  res.json({
    success: true,
    user_details: user
  });
});

router.post('/remove-portfolio-video', passport.authenticate('jwt', { session: false }), async(req, res) => {
  const user = await User.findById(req.user.id);
  const arr = req.body.videoUri.url.split("/");
  
  fs.unlinkSync(`${process.env.DOCUMENT_ROOT}/${arr[arr.length - 1]}`);
  const videos = _.filter(user.videos, video => video.url !== req.body.videoUri.url);
  user.videos = videos;
  user.save();
  res.json({
    success: true,
    user_details: user
  });
});

router.post('/update-user-details', passport.authenticate('jwt', { session: false }), async(req, res) => {
  const user = await User.findById(req.user.id);
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.city = req.body.city;
  user.state = req.body.state;
  user.country = req.body.country;
  user.pincode = parseInt(req.body.pincode);
  user.industry = req.body.industry
  user.gender = req.body.gender;
  user.description = req.body.description;
  user.location = req.body.location;
  user.phone_number = parseInt(req.body.phone_number)
  user.save();
  return res.json({
    success: true,
    code:200,
    message: "Information updated sucessfully"
  });
})

router.get('/additional-masters', async(req, res) => {
  const ethnicity = await Ethnicity.find({});
  const catalog = await Catalog.find({});
  const discipline = await Discipline.find({});
  const eyes = await Eyes.find({});
  const hair_color = await HairColor.find({});

  res.json({
    success: true,
    ethnicity: ethnicity,
    catalog: catalog,
    discipline: discipline,
    eyes: eyes,
    hair_color: hair_color
  });
})

router.get('/countries', async(req, res) => {
  const data = await Country.find({});
  res.send({
    success: true,
    code: 200,
    countries: data
  })
});

router.post('/states', async(req, res) => {
  const data = await State.find({
    country: req.body.country
  });
  res.send({
    success: true,
    code: 200,
    states: data
  })
})

router.get('/Country' , async (req,res) => {
  var all_country = await Country.find();
  if(all_country){
    res.json({
      status : true,
      code : 200,
      data : all_country
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "No countries found."
    });
  }
});

router.get('/State' , async (req,res) => {
  var all_state = await State.find();
  if(all_state){
    res.json({
      status : true,
      code : 200,
      data : all_state
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "No states found."
    });
  }
});

router.get('/Discipline' , async (req,res) => {
  var all_Discipline = await Discipline.find();
  if(all_Discipline){
    res.json({
      status : true,
      code : 200,
      data : all_Discipline
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "No Disciplines found."
    });
  }
});

router.get('/Ethnicity' , async (req,res) => {
  var all_Ethnicity = await Ethnicity.find();
  if(all_Ethnicity){
    res.json({
      status : true,
      code : 200,
      data : all_Ethnicity
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "No Ethnicity found."
    });
  }
});

router.get('/Eyes' , async (req,res) => {
  var all_Eyes = await Eyes.find();
  if(all_Eyes){
    res.json({
      status : true,
      code : 200,
      data : all_Eyes
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "No Eyes found."
    });
  }
});

router.get('/HairColor' , async (req,res) => {
  var all_HairColor = await HairColor.find();
  if(all_HairColor){
    res.json({
      status : true,
      code : 200,
      data : all_HairColor
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "No HairColor found."
    });
  }
});

router.post('/profile/edit-details', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user = await User.findOne({_id : req.user.id});

  user.first_name = req.body.first_name;
  user.description = req.body.description;
  user.location = req.body.location;
  user.city = req.body.city;
  user.gender = req.body.gender;
  user.country = req.body.country;
  user.industry = req.body.industry;
  user.state = req.body.state;
  user.pincode = req.body.pincode;
  user.ethnicity = req.body.ethnicity;
  user.discipline = req.body.discipline;
  user.eye = req.body.eye;
  user.hair_color = req.body.hair_color;
  user.created_at = Date.now();

  user.info = {
    height: req.body.height,
    dress: req.body.dress,
    shoes: req.body.shoes,
    weight: req.body.weight,
    heap: req.body.heap,
    age: req.body.age,
    chest: req.body.chest
  };

  if(user.save()){
    res.json({
      status : true,
      code : 200,
      data : user,
      message : "Profile updated successfully."
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "Profile update failed."
    });
  }
});

router.get('/get-additional-details', 
  passport.authenticate('jwt', {session : false}), 
  (req,res) => {
    const data = {};
    User.findById(req.user.id)
      .populate('catalog')
      .populate('discipline')
      .then(user => {
        if(user) {
          
          data.age = user.info[0].age;
          data.height = user.info[0].height;
          data.weight = user.info[0].weight;
          data.heap = user.info[0].heap;
          data.ethnicity = user.ethnicity;
    
          
          data.catalog = _.map(user.catalog, cat => {
            return {
              label: cat.name,
              value: cat._id.toString()
            }
          });
          data.discipline = _.map(user.discipline, disc => {
            return {
              label: disc.name,
              value: disc._id.toString()
            }
          });
          data.eye = user.eye;
          data.hair_color = user.hair_color;
    
          return res.json({
            success: true,
            code: 200,
            additional_details: data
          })
        }
      });
    
})

router.post('/update-additional-details',
  passport.authenticate('jwt', {session : false}),
  async (req,res) => {
    const user = await User.findById(req.user.id);
    if(user) {
      const catalog = _.map(req.body.catalog, 'value');
      const discipline = _.map(req.body.discipline, 'value');

      user.info.age = parseInt(req.body.age);
      user.ethnicity = req.body.ethnicity;
      user.catalog = catalog;
      user.discipline = discipline;
      user.eye = req.body.eye;
      user.hair_color = req.body.hair_color;
      user.info = {
        height: req.body.height,
        weight: req.body.weight,
        heap: req.body.heap,
        age: req.body.age
      };

      user.save();
      return res.json({
        success: true,
        code:200,
        message: "Additional information updated sucessfully"
      });
    }
    

  })

router.post('/agency-job-post', passport.authenticate('jwt', { session : false}), async (req,res) => {
  var agency_details = await User.findOne({_id : req.user.id});

  var job_title = req.body.job_title;
  var job_desc = req.body.job_desc;
  var job_start_date = req.body.job_start_date;
  var job_start_time = req.body.job_start_time;
  var job_end_date = req.body.job_end_date;
  var job_end_time = req.body.job_end_time;

  try{
    var job_post = new Job_post({
      user_id : req.user.id,
      job_title : job_title,
      job_desc : job_desc,
      job_start_date : job_start_date,
      job_start_time : job_start_time,
      job_end_date : job_end_date,
      job_end_time : job_end_time,
      // country : req.body.country,
      // state : req.body.state,
      // city: req.body.city,
      status : 1, //1='Active',0='Inactive'
      created_at : Date.now()
    });

    if(job_post.save()){
      res.json({
        status : true,
        code : 200,
        message : "Job posted successfully."
      });
    }
  }catch(e){
    res.json({
      status : false,
      code : 300,
      message : "Something went wrong."
    });
  }
});

router.get('/job-post-listings', passport.authenticate('jwt', {session:false}), async (req,res) => {
  var job_post_details = await Job_post.find({user_id : req.user.id, status:1});
  if(job_post_details){
    res.json({
      status: true,
      code : 200,
      job_post_details
    });
  }else{
    res.json({
      status: false,
      code : 300,
      message : "No recent jobs found."
    });
  }
});

router.post('/job-post-details', passport.authenticate('jwt', {session:false}), async (req,res) => {
  var job_post_id = req.body.job_id;
  var job_details = await Job_post.findOne({_id : job_post_id, user_id:req.user.id, status : 1});

  if(job_details) {
    res.json({
      status : true,
      code : 200,
      job_details
    });
  }else{
    res.json({
      status : false,
      code : 300,
      job_details
    });
  }
})

router.post('/edit-job-post', passport.authenticate('jwt', {session:false}), async (req,res) => {
  var job_post_id = req.body.job_id;
  var job_details = await Job_post.findOne({_id : job_post_id, user_id:req.user.id, status : 1});

  if(job_details){
    job_details.job_title = req.body.job_title;
    job_details.job_desc = req.body.job_desc;
    job_details.job_start_date = req.body.job_start_date;
    job_details.job_start_time = req.body.job_start_time;
    job_details.job_end_date = req.body.job_end_date;
    job_details.job_end_time = req.body.job_end_time;
    job_details.created_at = Date.now();

    job_details.save();

    res.json({
      status : true,
      code : 200,
      message : "Job post updated successfully.",
      job_details
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "Update failed."
    });
  }
});

router.post('/delete-jobs', passport.authenticate('jwt', {session:false}), async (req,res) =>{
  var job_post_id = req.body.job_id;
  var job_details = await Job_post.findOne({_id : job_post_id, user_id:req.user.id, status : 1});

  if(job_details){
    job_details.status = 0;

    job_details.save();
    res.json({
      status: true,
      code : 200,
      message : "Job post deleted successfully."
    });
  }else{
    res.json({
      status: false,
      code : 300,
      message : "No jobs found."
    });
  }
});

router.get('/all-others-agencies-job-post', async (req,res) => {
  var job_post_details = await Job_post.find({status:1}).populate('User');
  // console.log(job_post_details);
  // return false;
  if(job_post_details){
    res.json({
      status: true,
      code : 200,
      job_post_details
    });
  }else{
    res.json({
      status: false,
      code : 300,
      message : "No recent jobs found."
    });
  }
});

module.exports = router;

