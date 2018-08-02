const router = require('express').Router();
const multer = require('multer');
const csrf = require('csurf');
const Banner = require('../models/Banner');
const Auth = require('../middlewares/auth');

const csrfProtection = csrf({ cookie: true });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/banners');
    },
    filename: function (req, file, cb) {
      fileExt = file.mimetype.split('/')[1];
      if (fileExt == 'jpeg'){ fileExt = 'jpg';}
      fileName = req.user.id + '-' + Date.now() + '.' + fileExt;
      cb(null, fileName);
    }
})

var banner = multer({ storage: storage });

router.get('/banners', csrfProtection, Auth, async (req, res) => {
    const banners = await Banner.find({});
    const bannerSuccessMessage = req.flash('bannerSuccessMessage')[0];
    const bannerErrorMessage = req.flash('bannerErrorMessage')[0];
    res.render('banner/index', { 
        layout: 'dashboard', 
        banners, 
        msg: bannerSuccessMessage, 
        errorMsg: bannerErrorMessage, 
        _csrf: req.csrfToken() }
    );
});
router.get('/banners/add', csrfProtection, Auth, (req, res) => {
    res.render('banner/add', { layout: 'dashboard',  _csrf: req.csrfToken() });
});
router.post('/banners/add', banner.single('image'), csrfProtection, Auth, (req, res) => {
    const banner = new Banner({
        title_1: req.body.title_1,
        title_2: req.body.title_2,
        image: `${process.env.BASE_URL}/banners/${req.file.filename}`
    })
    banner.save();
    req.flash('bannerSuccessMessage', "Banner added successfully");
    res.redirect('/banners');
});
router.get('/banners/edit/:id', csrfProtection, Auth, async (req, res) => {
    const banner = await Banner.findById(req.params['id']);
    res.render('banner/edit', { layout: 'dashboard', banner, _csrf: req.csrfToken() });
});

router.post('/banners/edit/:id', banner.single('image'), csrfProtection, Auth, (req, res) => {
    Banner.findById(req.params['id'])
        .then(banner => {
            if(banner) {
                banner.title_1 = req.body.title_1;
                banner.title_2 = req.body.title_2;
                banner.image = (req.file === undefined) ? banner.image : `${process.env.BASE_URL}/banners/${req.file.filename}`;
                banner.save();
                req.flash('bannerSuccessMessage', "Banner updated successfully");
            }
            else {
                req.flash('bannerErrorMessage', "Please try again");
            }
            res.redirect('/banners');
        })
});

router.post('/banners/delete', csrfProtection, Auth, async (req, res) => {
    const data = await Banner.findById(req.body.banner_id).remove().exec();
    res.json({
        success: true
    });
})

module.exports = router;