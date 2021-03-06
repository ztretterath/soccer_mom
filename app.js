pry                = require('pryjs');
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
mongoose.Promise   = global.Promise;
var logger         = require('morgan');
var hbs            = require('hbs');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport       = require('passport');
var localStrategy  = require('passport-local');

//// MODELS ////
var User           = require('./models/user.js');

//// CONNECT TO DB ////
// mongoose.connect('mongodb://localhost/SoccerMom');

//// HEROKU ////
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/SoccerMom';
mongoose.connect(mongoURI);
//this runs locally or to heroku

//// MIDDLEWARE ////
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

//// SESSIONS/PASSPORT ////
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//// SET CONTROLLER ROUTE /////
app.use('/', require('./controllers/index.js'));

//// LISTEN HERE ////
app.listen(process.env.PORT || 3000);
//similar to db connection listen locally or on heroku 
