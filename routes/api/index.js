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
const ProfileComment = require('../../models/ProfileComment');
const Booking = require('../../models/Booking');
const FlagMenu = require('../../models/FlagMenu');
const Rating = require('../../models/Rating');
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

//for getting hostname
function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}
//end

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

    if(reg_type == 'F'){
      try{
        var already_login_with_social_app = await User.findOne({
          email,
          reg_type: 'F'
        });
    
        if(already_login_with_social_app) {
          already_login_with_social_app.first_name = req.body.full_name;
          already_login_with_social_app.last_name = '';
          already_login_with_social_app.email = req.body.email;
          if(extractHostname(req.body.profile_image) == 'graph.facebook.com') {
            already_login_with_social_app.avatar = req.body.profile_image;
          }
    
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
      }catch(e){
        res.json({
          status : false,
          code : 300,
          message : "Email already exist."
        });
      }
    }
    else if (reg_type == 'G') {
      try{
        var already_login_with_social_app_google = await User.findOne({
          email,
          reg_type: 'G'
        });
    
        if(already_login_with_social_app_google) {
          already_login_with_social_app_google.first_name = req.body.full_name;
          already_login_with_social_app_google.last_name = '';
          already_login_with_social_app_google.email = req.body.email;
          if(extractHostname(req.body.profile_image) == 'lh4.googleusercontent.com') {
            already_login_with_social_app_google.avatar = req.body.profile_image;
          }
    
          if(already_login_with_social_app_google.save()){
            const payload = {id: already_login_with_social_app_google._id, email: req.body.email, avatar: req.body.profile_image }; // Create JWT Payload
          
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
      }catch(e) {
        res.json({
          status : false,
          code : 300,
          message : "Email already exist."
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
  var total_comment_on_profile = 0;
  var avg_rating = total_rating = final_rating = 0;

  var fetch_rating_details = await Rating.find({user : profile_id});
  
  if(fetch_rating_details.length > 0){
    for(var i = 0; i < fetch_rating_details[0].rating_by_user.length; i++){
      var rating_number = fetch_rating_details[0].rating_by_user[i].number_of_rating;
      avg_rating = rating_number + avg_rating;
    }
  }
  total_rating = Math.round(avg_rating / 5) ;
  if(total_rating >= 5){
    final_rating = 5;
  }else{
    final_rating = total_rating;
  }

  var comment_details_on_profile = await ProfileComment.find({profile_id : profile_id});
  if(comment_details_on_profile != ''){
    var profileCommentArray = [];
    for(var i = 0; i < comment_details_on_profile.length; i++){
      var commented_user_id = comment_details_on_profile[i].comment_by;
      var commented_user_details = await User.findOne({_id:commented_user_id});
      var name = commented_user_details.first_name + ' ' + commented_user_details.last_name;
      var profile_image = commented_user_details.avatar;

      profileCommentArray.push({
        'commented_by' : name,
        'profile_img_link' : profile_image,
        'desc' : comment_details_on_profile[i].description,
        'comment_date' : comment_details_on_profile[i].uploaded_at
      });
    }
    total_comment_on_profile = comment_details_on_profile.length;
  }else{
    var profileCommentArray = [];
    profileCommentArray.push({
      'message' : "No comment found."
    });
  }

  var user_details = await User.findOne({_id  : profile_id},{password: 0, otp: 0, activation_link: 0});

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

  res.json({
      success: true,
      code: 200,
      user_details,
      last_two_images,
      last_two_videos,
      profileCommentArray,
      total_comment : total_comment_on_profile,
      total_rating : final_rating
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
    const videos = _.filter(user.videos, video => video.url === video_url_array[i]);

    await User.update({ _id: req.user.id }, { "$pull": { "videos": { "_id": videos[0]._id } }}, { safe: true, multi:true }, function(err, obj) {
      if(err) throw err;
        console.log(obj);
    });
    

    if(i == video_url_array.length - 1) {
      var user_details = await User.findOne({ _id: req.user.id});

      res.json({
        success: true,
        code: 200,
        data: user_details.videos,
        message: "Video link deleted successfully. "
      });
    }
  }
});

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

router.post('/change-password-fp', (req,res) => {
  var new_password_with_hashing;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.new_password, salt, (err, hash) => {
          if (err) throw err;
          new_password_with_hashing = hash;

          User.updateOne({
              email: req.body.new_password //matching with table id
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

router.post('/user-serach-result' , async (req,res) => {
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

    var user_search_result = await User.find({status:1}).or(
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
    ).populate('Industry');
    
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

  }else{
    jwt.verify(new_token, secretOrKey, async function (err, decoded) {
      var user_search_result = await User.find({status:1}).or(
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
            $nin: decoded.id
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


router.post('/forgot-password-frontend', async (req,res) => {
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
                              We have sent you this email with Link in response to your request to reset your password on Model Management System.
    
                                <br/><br/>
    
                                To reset your password for Model Management System login, please copy the below Link: 
                                <br/>

                                <br/><br/>
                  
                                  <a href="${process.env.FRONT_END_URL}/change-password/${user_details.activation_link}">Change Password</a>
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
    caption: '',
    uploaded_at: Date.now()
  };

  user.images.unshift(info);

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

router.post('/profile/fetch-comment', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user_login_id = req.user.id;
  var picture_id = req.body.picture_id;
  var user_profile_id = req.body.user_profile_id;

  if(user_profile_id != '') {
    var user_profile_details = await User.findOne({_id:user_profile_id});
    var user_portfolio_image_details = _.filter(user_profile_details.images, arr => arr.id === picture_id);
    // console.log(user_portfolio_image_details);
    // return false;

    var commentArray = [];
    var likeArray = [];

    if(user_portfolio_image_details != '') {
      //comment
      for(var i = 0; i<user_portfolio_image_details[0].comments.length; i++) {
        var users_id = user_portfolio_image_details[0].comments[i].user;
        var commented_user_details = await User.findOne({_id:users_id});
        var name = commented_user_details.first_name + ' ' + commented_user_details.last_name;
        var img_link = commented_user_details.avatar;
  
        commentArray.push({
          'comment_by' : name,
          'description' : user_portfolio_image_details[0].comments[i].description,
          'user_img_link' : img_link,
          'comment_date' : user_portfolio_image_details[0].comments[i].uploaded_at
        }); 
      }
      //like
      var total_like_on_image = 0;
      for(var i = 0; i<user_portfolio_image_details[0].likes.length; i++) {
        if(user_portfolio_image_details[0].likes[i].status == true) {
          var users_id = user_portfolio_image_details[0].likes[i].user;
          var commented_user_details = await User.findOne({_id:users_id});
          var name = commented_user_details.first_name + ' ' + commented_user_details.last_name;
          var img_link = commented_user_details.avatar;
          
          total_like_on_image = total_like_on_image + 1;

          likeArray.push({
            'liked_by' : name,
            'like_by_user_id' : user_portfolio_image_details[0].likes[i].user,
            'user_img_link' : img_link,
            'liked_date' : user_portfolio_image_details[0].likes[i].liked_at
          }); 
        }
      }
  
      var new_array = [];
      new_array.push({
        total_comment : user_portfolio_image_details[0].comments.length,
        total_like : total_like_on_image,
        comment_details : commentArray,
        like_details : likeArray
      });
  
      res.json({
        status : true,
        code : 200,
        new_array
      });
    }else{
      var new_array = [];
      new_array.push({
        total_comment : 0,
        total_like : 0,
        comment_details : "No comments found.",
        like_details : "As off now no one like your picture."
      });
      res.json({
        status : false,
        code : 300,
        new_array
      });
    }
  }else{
    var user_profile_details = await User.findOne({_id:user_login_id});
    var user_portfolio_image_details = _.filter(user_profile_details.images, arr => arr.id === picture_id);

    var commentArray = [];
    var likeArray = [];

    if(user_portfolio_image_details != '') {
      for(var i = 0; i<user_portfolio_image_details[0].comments.length; i++) {
        var users_id = user_portfolio_image_details[0].comments[i].user;
        var commented_user_details = await User.findOne({_id:users_id});
        var name = commented_user_details.first_name + ' ' + commented_user_details.last_name;
        var img_link = commented_user_details.avatar;
  
        commentArray.push({
          'comment_by' : name,
          'description' : user_portfolio_image_details[0].comments[i].description,
          'user_img_link' : img_link,
          'comment_date' : user_portfolio_image_details[0].comments[i].uploaded_at
        }); 
      }
      //like
      for(var i = 0; i<user_portfolio_image_details[0].likes.length; i++) {
        var users_id = user_portfolio_image_details[0].likes[i].user;
        var commented_user_details = await User.findOne({_id:users_id});
        var name = commented_user_details.first_name + ' ' + commented_user_details.last_name;
        var img_link = commented_user_details.avatar;
  
        likeArray.push({
          'liked_by' : name,
          'user_img_link' : img_link,
          'liked_date' : user_portfolio_image_details[0].likes[i].liked_at
        }); 
      }
  
      var new_array = [];
      new_array.push({
        total_comment : user_portfolio_image_details[0].comments.length,
        total_like : user_portfolio_image_details[0].likes.length,
        comment_details : commentArray,
        like_details : likeArray
      });
  
      res.json({
        status : true,
        code : 200,
        new_array
      });
    }else{
      var new_array = [];
      new_array.push({
        total_comment : 0,
        total_like : 0,
        comment_details : "No comments found.",
        like_details : "As off now no one like your picture."
      });
      res.json({
        status : false,
        code : 300,
        new_array
      });
    }
  }
});

router.post('/profile/delete-portfolio-images', passport.authenticate('jwt', {session : false}), async (req,res) => {
  const user = await User.findById(req.user.id);
  var image_url = req.body.imageUri;
  var make_image_array = image_url.split(",");

  for(var i = 0; i < make_image_array.length; i++){
    const images = _.filter(user.images, img => img.src === make_image_array[i]);

    await User.update({ _id: req.user.id }, { "$pull": { "images": { "_id": images[0]._id } }}, { safe: true, multi:true }, function(err, obj) {
      if(err) throw err;
        console.log(obj);
    });

    if(i == make_image_array.length - 1) {
      const user_details = await User.findById(req.user.id);
      res.json({
        success: true,
        code: 200,
        data: user_details.images,
        message: "Image deleted successfully. "
      });
    }
  }
});

router.post('/profile/add-comment-on-portfolio-image', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user_login_id = req.user.id;
  var comment = req.body.users_comment;
  var picture_id = req.body.picture_id;
  var user_profile_id = req.body.user_profile_id;

  if(user_login_id != user_profile_id) {
    var user_profile_details = await User.findOne({_id:user_profile_id});
    if(user_profile_details){
      var user_portfolio_image_details = _.filter(user_profile_details.images, arr => arr.id === picture_id);

      var info = {
        description : comment,
        user : user_login_id
      };

      if(user_portfolio_image_details[0].comments.length > 0) {
        user_portfolio_image_details[0].comments.unshift(info);
      }else{
        user_portfolio_image_details[0].comments = info;
      }

      if(user_profile_details.save()) {
        res.json({
          status: true,
          code:200,
          message : "Comment added successfully."
        });
      }else{
        res.json({
          status: false,
          code:300,
          message : "Comment added failed."
        });
      }
    }
  }else{
    res.json({
      status: false,
      code : 300,
      message : "Comment section is allow only for others user portfolio images."
    });
  }
});

router.post('/profile-wise-comment', passport.authenticate('jwt', {session:false}), async (req,res) => {
  var user_login_id = req.user.id;
  var comment = req.body.users_comment;
  var user_profile_id = req.body.user_profile_id;

  if(user_login_id != user_profile_id) {
    var add_comment = new ProfileComment({
      profile_id : user_profile_id,
      description : comment,
      comment_by : user_login_id
    });

    if(add_comment.save()){
      res.json({
        status : true,
        code : 200,
        message : "Comment added successfully."
      });
    }
  }else{
    res.json({
      status : false,
      code : 300,
      message : "Comment section allow only for other users profile."
    });
  }
});

router.post('/profile/add-like-on-portfolio-image', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user_login_id = req.user.id;
  var picture_id = req.body.picture_id;
  var user_profile_id = req.body.user_profile_id;

  if(user_login_id != user_profile_id) {
    var user_profile_details = await User.findOne({_id:user_profile_id});
    if(user_profile_details){
      var user_portfolio_image_details = _.filter(user_profile_details.images, arr => arr.id === picture_id);

      var user_portfolio_image_details_of_like = _.filter(user_portfolio_image_details[0].likes, arr => arr.user == user_login_id);
      
      if(user_portfolio_image_details_of_like == ''){
        var info = {
          status : true,
          user : user_login_id
        };
  
        if(user_portfolio_image_details[0].likes.length > 0) {
          user_portfolio_image_details[0].likes.unshift(info);
        }else{
          user_portfolio_image_details[0].likes = info;
        }
  
        if(user_profile_details.save()) {
          res.json({
            status: true,
            code:200,
            message : "Like added successfully."
          });
        }else{
          res.json({
            status: false,
            code:300,
            message : "Like added failed."
          });
        }
      } 
      else{
        
        user_portfolio_image_details_of_like[0].status = !user_portfolio_image_details_of_like[0].status;
        user_portfolio_image_details_of_like[0].liked_at = Date.now();

        var like;
        if(user_portfolio_image_details_of_like[0].status == true) {
          like = 'like';
        }else{
          like = 'dislike';
        }

        if(user_profile_details.save()) {
          res.json({
            status: true,
            code : 200,
            message : `Picture ${like} successfully. `
          });
        }
      }
      
    }
  }else{
    res.json({
      status: false,
      code : 300,
      message : "Comment section is allow only for others user portfolio images."
    });
  } 
});

router.get('/home-page-details', async (req, res) => {
  const banner = await Banner.find({});
  const categories = await Category.find({});
  const brands = await Brand.find({});
  //const users = await User.find({}).populate('industry');
  res.json({
    success: true,
    banner: banner,
    categories: categories,
    brands: brands
  });
});

router.get('/get-model-list', async (req, res) => {
  const users = await User.find({}).populate('industry');
  const userArr = [];
  for(var i = 0; i < users.length; i++) {
    userArr.push({
      src: users[i].avatar,
      caption: users[i].first_name + " " + users[i].last_name
    })
  }
  res.json({
    success: true,
    users: userArr
  })
})

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

router.post('/login-with-facebook', async(req, res) => {
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
    const name = req.body.name.split(" ");
    const newUser = new User({
      first_name: name[0],
      last_name: name[1],
      email: req.body.email,
      avatar: req.body.avatar,
      password: '',
      reg_type: 'F',
      status: 1,
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
      status: 1,
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

router.post('/profile/edit-details', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user = await User.findOne({_id : req.user.id},{password: 0, status: 0, otp: 0, activation_link: 0, reg_type:0 });

  user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
  user.description = req.body.description ? req.body.description : user.description;
  user.location = req.body.location ? req.body.location : user.location;
  user.city = req.body.city ? req.body.city : user.city;
  user.gender = req.body.gender ? req.body.gender : user.gender;
  user.country = req.body.country ? req.body.country : user.country;
  user.industry = req.body.industry ? req.body.industry : user.industry;
  user.state = req.body.state ? req.body.state : user.state;
  user.pincode = req.body.pincode ? req.body.pincode : user.pincode;
  user.ethnicity = req.body.ethnicity ? req.body.ethnicity : user.ethnicity;
  user.discipline = req.body.discipline ? req.body.discipline : user.discipline;
  user.eye = req.body.eye ? req.body.eye : user.eye;
  user.hair_color = req.body.hair_color ? req.body.hair_color : user.hair_color;
  user.created_at = Date.now();

  user.info = {
    height: req.body.height ? req.body.height : user.info.height,
    dress: req.body.dress ? req.body.dress : user.info.dress,
    shoes: req.body.shoes ? req.body.shoes : user.info.shoes,
    weight: req.body.weight ? req.body.weight : user.info.weight,
    heap: req.body.heap ? req.body.heap : user.info.heap,
    age: req.body.age ? req.body.age : user.info.age,
    chest: req.body.chest ? req.body.chest : user.info.chest
  };

  if(user.save()){ 
    res.json({
      status : true,
      code : 200,
      user,
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
          
          data.age = user.info.length > 0 ? user.info[0].age : 0;
          data.height = user.info.length > 0 ? user.info[0].height: null;
          data.weight = user.info.length > 0 ? user.info[0].weight : null;
          data.heap = user.info.length > 0 ? user.info[0].heap : null;
          data.ethnicity = user.ethnicity !== undefined ? user.ethnicity : null;
          data.chest = user.info.length > 0 ? user.info[0].chest : null;
          data.dress = user.info.length > 0 ? user.info[0].dress : null;
          
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
        age: req.body.age,
        chest: req.body.chest,
        dress: req.body.dress
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
      location: req.body.location,
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
    job_details.job_title = req.body.job_title ? req.body.job_title : job_details.job_title;
    job_details.job_desc = req.body.job_desc ? req.body.job_desc : job_details.job_desc;
    job_details.job_start_date = req.body.job_start_date ? req.body.job_start_date : job_details.job_start_date;
    job_details.job_start_time = req.body.job_start_time ? req.body.job_start_time : job_details.job_start_time;
    job_details.job_end_date = req.body.job_end_date ? req.body.job_end_date : job_details.job_end_date;
    job_details.job_end_time = req.body.job_end_time ? req.body.job_end_time : job_details.job_end_time;
    job_details.location = req.body.location ? req.body.location : job_details.location;
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

router.post('/model-booking', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var user = await User.findOne({_id : req.user.id});
  var model_profile_id = req.body.profile_id;
  var model_profile_details = await User.findOne({_id : model_profile_id});
  var model_booking_details = await Booking.find({booked_profile_id : model_profile_id});

  if(user.industry.toString() === model_profile_details.industry.toString()) {
    res.json({
      status : false,
      code : 300,
      message : "You can't book within same profession."
    });
  }else{
    var title = req.body.title;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var booked_by = req.user.id;
    var booked_profile_id = model_profile_id;
    var description = req.body.description;

    if(model_booking_details.length > 0) {
      var check_already_booked_within_date = 0;
      var already_book_by_you = 0;

      for(var i =0; i < model_booking_details.length; i++) {
        if(model_booking_details[i].start_date == start_date && model_booking_details[i].start_time == start_time) {
          check_already_booked_within_date = check_already_booked_within_date + 1;
        }
      }
      
      if(check_already_booked_within_date > 0) {
        res.json({
          status : false,
          code : 300,
          message : "Model already booked within your given date & time. Please choose any other date."
        });
      }else{
        var add_new_booking_model = new Booking({
          title : title,
          start_date : start_date,
          end_date : end_date,
          start_time : start_time,
          end_time : end_time,
          booked_by : booked_by,
          booked_profile_id : booked_profile_id,
          booking_status : 1,
          description: description,
          created_at : Date.now()
        });

        if(add_new_booking_model.save()) {
          res.json({
            status : true,
            code : 200,
            message : "Model booked successfully."
          });
        }
      }
      
    }else{
      var add_new_booking_model = new Booking({
        title : title,
        start_date : start_date,
        end_date : end_date,
        start_time : start_time,
        end_time : end_time,
        booked_by : booked_by,
        booked_profile_id : booked_profile_id,
        booking_status : 1,
        description: description,
        created_at : Date.now()
      });

      if(add_new_booking_model.save()) {
        res.json({
          status : true,
          code : 200,
          message : "Model booked successfully."
        });
      }
    }
  }
});

router.post('/booking-history', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var model_booking_pending_details = await Booking.find({booked_profile_id : req.user.id, booking_status:1});

  if(model_booking_pending_details.length > 0) {
    var bookingArray = [];
    for(var i = 0; i < model_booking_pending_details.length; i++) {
      var booked_by_user_id = model_booking_pending_details[i].booked_by;
      var booked_by_user_details = await User.find({_id:booked_by_user_id});
      var name = booked_by_user_details[0].first_name + " " + booked_by_user_details[0].last_name;
      var profile_img_url = booked_by_user_details[0].avatar;

      bookingArray.push({
        'booked_by_user_name' : name,
        'booked_by_user_profile_img_url' : profile_img_url,
        'booking_location' : booked_by_user_details[0].location,
        'booking_date_start_date' : model_booking_pending_details[i].start_date,
        'booking_date_end_date' : model_booking_pending_details[i].end_date,
        'booking_time' : model_booking_pending_details[i].start_time,
        'booking_end_time' : model_booking_pending_details[i].end_time,
        'title' : model_booking_pending_details[i].title,
        'description' : model_booking_pending_details[i].description,
        'booking_id' : model_booking_pending_details[i]._id
      });
    }

    res.json({
      status : true,
      code : 200,
      bookingArray
    });
  }else{
    res.json({
      status : false,
      code : 300,
      message : "No one booked."
    });
  }
});

router.post('/approve-or-reject-of-booking', passport.authenticate('jwt', {session : false}), async (req,res) => {
    var approve_or_reject_value = req.body.request_type; //1='Approve',0='Reject'
    var booking_id = req.body.booking_id;

    var booking_details = await Booking.findById({_id:booking_id, booked_profile_id: req.user.id});
    var booking_status = '';
    if(approve_or_reject_value == 1){
        booking_details.booking_status = 2; //approve
        booking_status = 'Approved';
    }
    else if(approve_or_reject_value == 0) {
        booking_details.booking_status = 3; //reject
        booking_status = 'Rejected';
    }

    if(booking_details.save()) {
        res.json({
            status : true,
            code : 200,
            message : `${booking_status} successfully.`
        });
    }else{
        res.json({
            status : false,
            code : 300,
            message : 'Something went wrong.'
        });
    }
});

router.post('/approve-history', passport.authenticate('jwt', {session : false}), async (req,res) => {
    var model_booking_approved_details = await Booking.find({booked_profile_id : req.user.id, booking_status:2});

    if(model_booking_approved_details.length > 0) {
      var bookingArray = [];
      for(var i = 0; i < model_booking_approved_details.length; i++) {
        var booked_by_user_id = model_booking_approved_details[i].booked_by;
        var booked_by_user_details = await User.find({_id:booked_by_user_id});
        var name = booked_by_user_details[0].first_name + " " + booked_by_user_details[0].last_name;
        var profile_img_url = booked_by_user_details[0].avatar;
  
        bookingArray.push({
          'booked_by_user_name' : name,
          'booked_by_user_profile_img_url' : profile_img_url,
          'booking_location' : booked_by_user_details[0].location,
          'booking_date_start_date' : model_booking_approved_details[i].start_date,
          'booking_date_end_date' : model_booking_approved_details[i].end_date,
          'booking_time' : model_booking_approved_details[i].start_time,
          'booking_end_time' : model_booking_approved_details[i].end_time,
          'title' : model_booking_approved_details[i].title,
          'description' : model_booking_approved_details[i].description,
          'booking_id' : model_booking_approved_details[i]._id
        });
      }
  
      res.json({
        status : true,
        code : 200,
        bookingArray
      });
    }else{
      res.json({
        status : false,
        code : 300,
        message : "No records are found."
      });
    }  
});

router.post('/reject-history', passport.authenticate('jwt', {session : false}), async (req,res) => {
    var model_booking_rejected_details = await Booking.find({booked_profile_id : req.user.id, booking_status:3});

    if(model_booking_rejected_details.length > 0) {
      var bookingArray = [];
      for(var i = 0; i < model_booking_rejected_details.length; i++) {
        var booked_by_user_id = model_booking_rejected_details[i].booked_by;
        var booked_by_user_details = await User.find({_id:booked_by_user_id});
        var name = booked_by_user_details[0].first_name + " " + booked_by_user_details[0].last_name;
        var profile_img_url = booked_by_user_details[0].avatar;
  
        bookingArray.push({
          'booked_by_user_name' : name,
          'booked_by_user_profile_img_url' : profile_img_url,
          'booking_location' : booked_by_user_details[0].location,
          'booking_date_start_date' : model_booking_rejected_details[i].start_date,
          'booking_date_end_date' : model_booking_rejected_details[i].end_date,
          'booking_time' : model_booking_rejected_details[i].start_time,
          'booking_end_time' : model_booking_rejected_details[i].end_time,
          'title' : model_booking_rejected_details[i].title,
          'description' : model_booking_rejected_details[i].description,
          'booking_id' : model_booking_rejected_details[i]._id
        });
      }
  
      res.json({
        status : true,
        code : 200,
        bookingArray
      });
    }else{
      res.json({
        status : false,
        code : 300,
        message : "No records are found."
      });
    }
});

router.post('/sent-invitation-list', passport.authenticate('jwt', {session : false}), async (req,res) => {
    var sent_invitation_list = await Booking.find({booked_by : req.user.id});
    if(sent_invitation_list.length > 0){
        var sentInvitationArray = [];
        var booking_status = '';
        for(var i = 0; i < sent_invitation_list.length; i++) {
        var whom_i_booked_user_id = sent_invitation_list[i].booked_profile_id;
        var booked_user_details = await User.find({_id:whom_i_booked_user_id});
        var name = booked_user_details[0].first_name + " " + booked_user_details[0].last_name;
        var profile_img_url = booked_user_details[0].avatar;
        
        if(sent_invitation_list[i].booking_status == 1) {
            booking_status = 'Pending';
        }else if(sent_invitation_list[i].booking_status == 2){
            booking_status = 'Approved';
        }else if (sent_invitation_list[i].booking_status == 3) {
            booking_status = 'Rejected';
        }

        sentInvitationArray.push({
            'booked_by_user_name' : name,
            'booked_by_user_profile_img_url' : profile_img_url,
            'booking_location' : booked_user_details[0].location,
            'booking_date_start_date' : sent_invitation_list[i].start_date,
            'booking_date_end_date' : sent_invitation_list[i].end_date,
            'booking_time' : sent_invitation_list[i].start_time,
            'booking_end_time' : sent_invitation_list[i].end_time,
            'title' : sent_invitation_list[i].title,
            'description' : sent_invitation_list[i].description,
            'booking_id' : sent_invitation_list[i]._id,
            'booking_status' : booking_status
        });
        }

        res.json({
            status : true,
            code : 200,
            sentInvitationArray
        });
    }else{
        res.json({
            status : false,
            code : 300,
            message : "No records are found."
        });
    }
});

router.get('/flag-menu', async (req,res) => {
    var all_flag_details = await FlagMenu.find();
    res.json({
        status : true,
        code : 200,
        all_flag_details
    });
});

router.post('/report-against-image', passport.authenticate('jwt', {session : false}), async (req,res) => {
    var user = await User.find({_id : req.user.id});
    var image_id = req.body.image_id;
    var profile_id = req.body.profile_id;
    var report_type = req.body.report_type;
    var report_desc = req.body.request_desc;

    
});

router.post('/add-rating-on-user', passport.authenticate('jwt', {session : false}), async (req,res) => {
  var profile_id = req.body.profile_id;
  var rating_number = req.body.rating_number;

  var fetch_rating_details = await Rating.findOne({user: profile_id});
  if(fetch_rating_details) {
      const rating_details_if_exist = _.filter(fetch_rating_details.rating_by_user, rate => rate.user_id == req.user.id);
      if(rating_details_if_exist.length > 0) {
        rating_details_if_exist[0].number_of_rating = rating_number;
        if(fetch_rating_details.save()) {
          res.json({
            status : true,
            code : 200,
            message : "Rating updated successfully."
          });
        }
      }else{
        var all_rating = {
          user_id : req.user.id,
          number_of_rating : rating_number
        };
        fetch_rating_details.rating_by_user.unshift(all_rating);
        fetch_rating_details.save();
        res.json({
          status : true,
          code : 200,
          message : "Rating addeed successfully."
        });
      }
  }else{
    var all_rating = {
      user_id : req.user.id,
      number_of_rating : rating_number
    };

    var add = new Rating ({
      user : profile_id,
      rating_by_user : all_rating
    });

    if(add.save()){
      res.json({
        status : true,
        code : 200,
        message : "Rating addeed successfully."
      });
    }else{
      res.json({
        status : false,
        code : 300,
        message : "Rating addeed failed."
      });
    }
  }
});

module.exports = router;

