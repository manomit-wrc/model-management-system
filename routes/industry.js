const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const Auth = require("../middlewares/auth");
const Industry = require('../models/Industry').Industry;

const csrfProtection = csrf({ cookie: true });

router.get('/industry-listings', csrfProtection, Auth, async (req,res) => {
    var all_data = await Industry.find({});
    res.render('industry/listings', {layout: "dashboard", title: "Industry", all_industry: all_data, _csrf: req.csrfToken()})
});

router.post('/add-industry', csrfProtection, Auth, async (req,res) => {
    var industry = await Industry.findOne({name:req.body.industry_name});
    if(industry){
        res.json({
            success: false,
            messages: "Already exist." 
        });
    }else{
        var industry = Industry.create({
            name:req.body.industry_name
        }).then(result => {
            if(result){
                res.json({
                    success: true,
                    messages: "Added successfully."
                });
            }
        });
    }
});

module.exports = router;