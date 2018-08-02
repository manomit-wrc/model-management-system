const router = require('express').Router();
const multer = require('multer');
const csrf = require('csurf');
const Brand = require('../models/Brand');
const Auth = require('../middlewares/auth');
const fs = require('fs');

const csrfProtection = csrf({ cookie: true });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/brands');
    },
    filename: function (req, file, cb) {
      fileExt = file.mimetype.split('/')[1];
      if (fileExt == 'jpeg'){ fileExt = 'jpg';}
      fileName = req.user.id + '-' + Date.now() + '.' + fileExt;
      cb(null, fileName);
    }
})

var brand = multer({ storage: storage });

router.get('/brands', csrfProtection, Auth, async (req, res) => {
    const brands = await Brand.find({});
    res.render('brand/index', { layout: 'dashboard', brands, _csrf: req.csrfToken() });
});

router.post('/brand', brand.single('image'), csrfProtection, Auth, (req, res) => {
    if(req.body._id) {
        Brand.findById(req.body._id)
        .then(brand => {
            if(brand) {
                brand.name = req.body.name;
                brand.image = (req.file === undefined) ? brand.image : `${process.env.BASE_URL}/brands/${req.file.filename}`;
                brand.save();
                res.json({
                    success: true,
                    message: "Brand updated successfully"
                });
            }
        })
    }
    else {
        const newBrand = new Brand({
            name: req.body.name,
            image: (req.file === undefined) ? "/assets/images/1.jpg" : `${process.env.BASE_URL}/brands/${req.file.filename}`
        });
    
        newBrand.save();
        res.json({
            success: true,
            message: "Brand added successfully"
        });
    }
})

router.post('/brand/delete', csrfProtection, Auth, async (req, res) => {
    const data = await Brand.findById(req.body.brand_id).remove().exec();
    res.json({
        success: true
    });
});

module.exports = router;