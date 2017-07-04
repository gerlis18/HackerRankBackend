const User = require('../models/user');

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username}
    User.findOne(query, callback);
};

module.exports.updateImage = function (id, imageUrl, callback) {
    User.update({_id: id},{ $set: {imageUrl: imageUrl}}, callback);
};

module.exports.deleteUser = (id, callback) => {
    User.findByIdAndRemove(id, callback);
};

