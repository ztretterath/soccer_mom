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

// UPDATE USER PASSWORD //
router.get('/:id/edit', function(req, res){
  User.findById(req.params.id, function(err, user){
    res.render('user/edit.hbs/', {user:user})
  });
});

// USING SANITIZED USERS //
router.put('/:id', function(req, res){
  console.log("User's password", req.body.password);
  User.findById(req.params.id, function(err, user){
    user.setPassword(req.body.password, function(){
      user.save();
      res.redirect('/signin');
    });
  });
});
  // var newPassword = req.body.password;
  // console.log(newPassword);

  // User.findById(req.params.id)
  // .then(function(sanitizedUser){
  //   if (sanitizedUser){
  //     sanitizedUser.setPassword(newPassword, function(){
  //       sanitizedUser.save();
  //       res.status(200).json({message: 'password success!'});
  //     });
  //   } else {
  //     res.status(500).json({message: 'no such user!'})
  //   }
  // }, function(err){
  //   console.log(err);
  // });


// BEST ATTEMPT //
  // router.put('/:id/update', function(req, res){
  //   User.findByIdAndUpdate(req.params.id, {
  //     username: req.body.username
  //   }, {new:true}, function(err, user) {
  //       res.render('user/userhome.hbs', {user:user});
  //   });
  // });

//LOG TEST
  // router.put('/:id/update', function(req, res) {
  //   var user = User.findById(req.params.id);
  //   console.log(user);
  // })
//PROMISE
 // router.put('/update', function(req, res){
 //   User.findById(req.params.id)
 //   .then(function(User){
 //     User.update({username: username}, {
 //       username: req.body.username
 //     })
 //   })
 //   .then(function(user){
 //     res.render('user/userhome.hbs', {user:user})
 //   });
 // }); //end put route

// DELETE SNACK ////
router.delete('/users/:userId/snacks/:id', function(req, res) {
    // console.log("This is user_id: ", req.params.userId);
    // console.log("This is snack_id: ", req.params.id);
    // NEW ATTEMPT
    //access user.snacks by id and delete the snack
    User.findByIdAndUpdate(req.params.userId, {
      $pull: {
        snacks: {_id: req.params.id}
      }
    }, function(err, docs){
      console.log(docs);
      if(!err) {
        res.redirect('/userhome')
      }
    });

    // User.findById(req.params.userId, function(err, user){
    //
    //   //splice
    //   //User.save
    // });

});
// NEW ATTEMPT
  // var user = req.user;
  // var snacks = user.snacks;
  // var id = req.params.id;
  // var test = req.user.snacks.indexOf(removeSnack);
  // console.log("snackId:" + removeSnack);

// NEW ATTEMPT
  // snacks.findByIdAndRemove({_id: id}, function(err){
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect('/userhome');
  //     return res.status(200).send();
  //   }
  //   // console.log();
  // })

// NEW ATTEMPT
  // Snack.findByIdAndUpdate(removeSnack,
  //   {
  //     $pull: {
  //       // snacks: {"_id": req.params.snackId}
  //       snacks: [{_id: req.params.snackId}]
  //     }
  //   }, function(err) {
  //     res.redirect('/userhome')
  //   })
  // // console.log(test);

  // snacks: {_id: req.params.id}
  // console.log(req.params.id);

// NEW ATTEMPT
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


  // console.log('snack id:'+req.params.snackId);

// NEW ATTEMPT
// var id = req.params.id;
//
//   Snack.findByIdAndRemove({_id:id}, function(err){
//     console.log(id);
//     res.redirect('/userhome');
//   })



module.exports = router;
