const userTestModel = require('../models/usersTest');

module.exports.add = (newUserTest, callback) => {
    newUserTest.save(callback);
}

module.exports.getUserTests = (callback) => {
    userTestModel.find(callback);
}

module.exports.getUserTestById = (id, callback) => {
    userTestModel.findById(id,callback);
}

