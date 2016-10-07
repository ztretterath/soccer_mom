var pry           = require('pryjs');
var express       = require('express');
var router        = express.Router();
var passport      = require('passport');
var localStrategy = require('passport-local').Strategy;
var User          = require('../models/user.js');
var Snack         = require('../models/snack.js')
// var methodOverride = require('method-override');

// var authenticate = function(req, res, next) {
//   if (!req.user || req.user._id != req.params.id) {
//     console.log('not authorized');
//     res.json({status: 401, message: 'unauthorized'})
//   } else {
//     next();
//   }
// }

//// HOMEPAGE ROUTE ////
router.get('/', function(req, res){
  User.find({})
  .then(function(user){
    res.render('home.hbs/', {user:req.user});
  });
});

//// CALENDAR ////
router.get('/calendar', function(req, res, user){
  res.render('user/calendar.hbs/', {user:req.user})
});

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
      res.redirect('/signin')
    }
  )
});

//// USER HOMEPAGE ////
router.get('/userhome', function(req, res){
  // if (!req.user || req.user._id != req.params.id){
  //   console.log('not authorized');
  //   res.redirect('/');
  // } else {
  //   User.find({})
  //   .then(function(user) {
  //     res.render('user/userhome.hbs', {user:req.user});
  //   })
  //   .catch(function(err){
  //     res.json({message: 'not today ' + err});
  //   });
  // }
  res.render('user/userhome.hbs', {user:req.user});
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

//// LOGOUT ////
router.delete('/signout', function(req, res){
  req.logout();
  res.redirect('/');
});

//// MOTHER LIST ////
router.get('/motherlist', function(req, res){
  // var array = Users.find().fetch();
  // var randomIndex = Math.floor(Math.random()*array.length);
  // var nextSnack = array[randomIndex];
  // var user = User.findById({id: req.params.id});
  User.find({}, function(err, users){
    var user = User.findById({id: req.params.id});
    console.log('user:' + user);
    // console.log(users);
    res.render('user/motherlist.hbs/', { users:users, user:user });
  });
});

//// NEW SNACK ////
router.post('/newSnack/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    // console.log(user);
    user.snacks.push(new Snack({name: req.body.name}))
    user.save(function(err, snack){
      res.redirect('/userhome');
    });
  });
});

// DELETE SNACK ////
router.delete('/deleteSnack/:snackId', function(req, res) {
  User.findByIdAndUpdate(req.params.id, {
    $pull: {
      // snacks: {"_id": req.params.snackId}
      snacks: {_id: req.params.snackId}
    }
  }, function(err) {
    res.redirect('/userhome')
  })
  console.log('snack id:'+req.params.snackId);
})

// snacks: {_id: req.params.id}
// console.log(req.params.id);
//
// router.delete('/deleteSnack/:id', function(req, res){
//   // console.log("delete path");
//   User.findOne(req.params)
//   .then(function(user) {
//     $pull: {snacks: {$in: req.params.id}}
//   })
//   .then(function(err) {
//     res.redirect('/userhome')
//   });
// }); //end route
// router.get('/remove', function(req, res){
//   User.findOne(
// })



module.exports = router;
