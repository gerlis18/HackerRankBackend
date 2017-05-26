const User = require('../models/user');
const bcrypt = require('bcryptjs');

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