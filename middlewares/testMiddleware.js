const testModel = require('../models/tests.js');

module.exports.addTest = (newTest, callback) => {
    newTest.save(callback)
}

module.exports.getTests = (callback) => {
    testModel.find(callback);
}

module.exports.getTestById = (id, callback) => {
    testModel.findById(id,callback);
}

module.exports.getTestByTitle = (title, callback) => {
    const query = { title: title }
    testModel.findOne(query,callback);
}