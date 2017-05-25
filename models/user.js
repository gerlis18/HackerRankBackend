const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username}
    User.findOne(query, callback);
}



module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        console.log(`Esta es la contraseña: ${newUser.password}`);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
