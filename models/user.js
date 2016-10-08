var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var snackSchema = require('./snack.js').schema;

var userSchema = new Schema({
  username:  String,
  password:  String,
  favSnackType: String,
  snacks: [snackSchema]
});

userSchema.plugin(require('passport-local-mongoose'));

// var User = mongoose.model

module.exports = mongoose.model('User', userSchema);
