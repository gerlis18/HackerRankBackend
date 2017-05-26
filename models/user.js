const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);

