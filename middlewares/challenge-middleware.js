const challengeModel = require('../models/challenge');

module.exports.addTest = (newTest, callback) => {
    newTest.save(callback);
}

module.exports.getTests = (callback) => {
    challengeModel.find(callback);
}

module.exports.getTestById = (id, callback) => {
    challengeModel.findById(id, callback);
}

module.exports.getTestByTitle = (title, callback) => {
    const query = { title: title }
    challengeModel.findOne(query, callback);
}

module.exports.updateTest = (id, test, callback) => {
    challengeModel.findByIdAndUpdate(id, test, { new: true }, callback);
}

module.exports.deleteTest = (id, callback) => {
    challengeModel.findByIdAndRemove(id, callback);
}