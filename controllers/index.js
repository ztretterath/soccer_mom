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
      if (err) {
        return res.status(400).send('No such luke w/ registering');
      }
      res.redirect('/')
    }
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
      res.redirect(`/`);
    })
    .catch(function(err){
      console.log('error: ', err);
    })
  })
});

module.exports = router;
