var pry      = require('pryjs');
var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user.js');

//// HOMEPAGE ROUTE ////
router.get('/', function(req, res){
  res.render('home.hbs/');
})

//// SIGN IN ////
router.post('/signin',passport.authenticate('local', {failureRedirect: '/'}), function(req, res){
  req.session.save(function(err){
    if (err) {
      return next(err);
    }
    User.findOne({username: req.session.passport.user}).exec()
    .then(function(user){
      res.redirect(`/home/${user._id}`);
    })
    .catch(function(err){
      console.log('error: ', err);
    })
  })
});

module.exports = router;
