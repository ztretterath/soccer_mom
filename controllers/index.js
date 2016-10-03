var pry      = require('pryjs');
var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user.js');

//// HOMEPAGE ROUTE ////
router.get('/', function(req, res){
  res.render('home.hbs/');
})

//// SIGN UP ////
router.get('/signup', function(req, res){
  res.render('user/signup.hbs/')
});

router.post('/signup', function(req, res){
  User.register(
    new User({
      username: req.body.username,
      password: req.body.password,
      favSnackType: req.body.password
    })
  )
});

//// SIGN IN ////
router.get('/signin', function(req, res){
  res.render('user/signin.hbs/')
});

router.post('/signin',passport.authenticate('local', {failureRedirect: '/'}), function(req, res){
  req.session.save(function(err){
    if (err) {
      return next(err);
    }
    User.findOne({username: req.session.passport.user}).exec()
    .then(function(user){
      res.redirect(`/home`);
    })
    .catch(function(err){
      console.log('error: ', err);
    })
  })
});

module.exports = router;
