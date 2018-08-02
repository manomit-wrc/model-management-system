const router = require('express').Router();
const multer = require('multer');
const csrf = require('csurf');
const Category = require('../models/Category');
const Auth = require('../middlewares/auth');

const csrfProtection = csrf({ cookie: true });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/categories');
    },
    filename: function (req, file, cb) {
      fileExt = file.mimetype.split('/')[1];
      if (fileExt == 'jpeg'){ fileExt = 'jpg';}
      fileName = req.user.id + '-' + Date.now() + '.' + fileExt;
      cb(null, fileName);
    }
})

var category = multer({ storage: storage });

router.get('/categories', csrfProtection, Auth, async (req, res) => {
    const categories = await Category.find({});
    const categorySuccessMessage = req.flash('categorySuccessMessage')[0];
    const categoryErrorMessage = req.flash('categoryErrorMessage')[0];
    res.render('category/index', { 
        layout: 'dashboard', 
        categories, 
        msg: categorySuccessMessage, 
        errorMsg: categoryErrorMessage, 
        _csrf: req.csrfToken() }
    );
});

router.get('/categories/add', csrfProtection, Auth, (req, res) => {
    res.render('category/add', { layout: 'dashboard',  _csrf: req.csrfToken() });
});

router.post('/categories/add', category.single('image'), csrfProtection, Auth, (req, res) => {
    const category = new Category({
        name: req.body.name,
        is_new: req.body.is_new ? req.body.is_new : 0,
        image: `${process.env.BASE_URL}/categories/${req.file.filename}`
    })
    category.save();
    req.flash('categorySuccessMessage', "Category added successfully");
    res.redirect('/categories');
});

router.get('/categories/edit/:id', csrfProtection, Auth, async (req, res) => {
    const category = await Category.findById(req.params['id']);
    res.render('category/edit', { layout: 'dashboard', category, _csrf: req.csrfToken() });
});

router.post('/categories/edit/:id', category.single('image'), csrfProtection, Auth, (req, res) => {
    Category.findById(req.params['id'])
        .then(category => {
            if(category) {
                category.name = req.body.name;
                category.is_new = req.body.is_new ? req.body.is_new : 0;
                category.image = (req.file === undefined) ? category.image : `${process.env.BASE_URL}/categories/${req.file.filename}`;
                category.save();
                req.flash('categorySuccessMessage', "Category updated successfully");
            }
            else {
                req.flash('categoryErrorMessage', "Please try again");
            }
            res.redirect('/categories');
        })
});

router.post('/categories/delete', csrfProtection, Auth, async (req, res) => {
    const data = await Category.findById(req.body.category_id).remove().exec();
    res.json({
        success: true
    });
})

module.exports = router;