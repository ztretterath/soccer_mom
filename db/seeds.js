var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SoccerMom');


//// SCHEMA ////
var Schema = require('../models/user.js');
var User   = Schema.User;
var Snack  = Schema.Snack;
