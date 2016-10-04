var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var snackSchema = new Schema({
  name:  String
});

snackSchema.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('Snack', snackSchema);
