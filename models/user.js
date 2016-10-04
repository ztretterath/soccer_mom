var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var snackSchema = require('./user.js')

var userSchema = new Schema({
  username:  String,
  password:  String,
  favSnackType: String,
  snacks: [snackSchema],
  createdAt: Date,
  updatedAt: Date
});

userSchema.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('User', userSchema);
