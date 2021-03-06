const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  jobTitle: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
});

module.exports = mongoose.model('User', UserSchema);

