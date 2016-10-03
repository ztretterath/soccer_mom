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

mongoose.connect('mongodb://localhost/SoccerMom');

//// MIDDLEWARE /////
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
