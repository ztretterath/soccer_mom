var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  String,
  password:  String,
  createdAt: Date,
  updatedAt: Date
});
