var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var snackSchema = new Schema({
  name:  String,
  createdAt: Date,
  updatedAt: Date
});

snackSchema.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('Snack', snackSchema);
