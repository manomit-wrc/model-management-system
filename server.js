const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const passport = require("passport");
const path = require("path");
const flash = require("connect-flash");
require('dotenv').config({path: 'variables.env'});
const dbURI = require("./config/keys").mongoURI;

const port = process.env.PORT || 8000;

const handlebars = require("handlebars");
const layouts = require("handlebars-layouts");

handlebars.registerHelper(layouts(handlebars));


const api = require('./routes/api/index');
const index = require('./routes/index');
const dashboard = require('./routes/dashboard');
const brand = require('./routes/brand');
const banner = require('./routes/banner');
const category = require('./routes/category');
const industry = require('./routes/industry');

const app = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);

mongoose.Promise = global.Promise;

mongoose.connect(dbURI, { useNewUrlParser: true })
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.log(err));

const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        if_eq: function (a, b, opts) {
            if (a == b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        inArray: function(array, value, block) {
            if (array.indexOf(value) !== -1) {
                return block.fn(this);
            }
            else {
                return block.inverse(this);
            }
        },

        dateFormat: require('handlebars-dateformat')
    }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use(bodyParser.json({limit: '50mb'}));

app.use(session({
    secret: 'W$q4=25*8%v-}UV',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        maxAge: 1800000
    },
    name: "id",
    ttl: (1* 60* 60)
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
require('./config/cache');

app.use(flash());

/******* Routes ********/
app.use('/api/users', api);
app.use(index);
app.use(dashboard);
app.use(brand);
app.use(banner);
app.use(category);
app.use(industry);
/******* End **********/

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server listening to port ${port}`));
