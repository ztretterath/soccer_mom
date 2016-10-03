var pry      = require('pryjs');
var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user.js');

//// HOMEPAGE ROUTE ////
router.get('/', function(req, res){
  res.send('Home Page');
})

module.exports = router;
