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
var User           = require('./models/user.js');


mongoose.connect('mongodb://localhost/SoccerMom');

//// MIDDLEWARE /////
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
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
