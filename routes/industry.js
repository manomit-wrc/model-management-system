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

router.post('/industry-delete' , Auth, async (req,res) => {
    var result = await Industry.remove( { 
        _id: req.body.row_id 
    });
    if(result){
        res.json({
            success: true,
            messages: "Record deleted successfully."
        });
    }
});

router.post("/edit-industry", csrfProtection, Auth, async (req,res) => {
    var industry = await Industry.findOne({name:req.body.industry_name});
    if(industry){
        res.json({
            success: false,
            messages: "Already exist." 
        });
    }else{
        var update = await Industry.updateOne({
            _id: req.body.row_id
        },{
            $set:{
                name:req.body.industry_name
            }
        });
        if(update){
            res.json({
                success: true,
                messages: "Edit successfully."
            });
        }
    }
});

module.exports = router;