var pry      = require('pryjs');
var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User     = require('../models/user.js');

//// HOMEPAGE ROUTE ////
router.get('/', function(req, res){
  User.find({})
  .then(function(user){
    res.render('home.hbs/', {user:req.user});
  })

})

//// SIGN UP ////
router.get('/signup', function(req, res){
  res.render('user/signin.hbs/')
});

router.post('/signup', function(req, res){
  User.register(
    new User({
      username: req.body.username,
      password: req.body.password,
      favSnackType: req.body.password,
      createdAt: new Date(),
      updatedAt: new Date()
    }),
    req.body.password,
    function(err, user) {
      if (err) return res.json({user:user});
      // {
      //   return res.status(400).send('No such luke w/ registering');
      // }
      res.redirect('/')
    }
  )
});

//// USER HOMEPAGE ////
router.get('/userhome', function(req, res){
  User.find({})
  .then(function(user) {
    res.render('user/userhome.hbs', {user:req.user});
  })

  // User.findOne({username: req.params.username})
  // .then(function(user){
  //   res.render('user/userhome.hbs', user);
  // });
});

//// SIGN IN ////
router.get('/signin', function(req, res){
  res.render('user/signin.hbs/')
});

router.post('/signin', passport.authenticate('local', {failureRedirect: '/'}), function(req, res){
  req.session.save(function(err){
    if (err) return next(err);
    User.findOne({username: req.session.passport.user}).exec()
    .then(function(user){
      res.redirect('/userhome');
    })
    .catch(function(err){
      console.log('error: ', err);
    })
  })
});

//// MOTHER LIST ////
router.get('/motherlist', function(req, res){
  User.find({}, function(err, users){
    res.render('user/motherlist.hbs/', { users:users, user:req.user });
  });
});

//// LOGOUT ////
router.delete('/logout', function(){
  req.logout();
  res.redirect('/');
})

module.exports = router;
