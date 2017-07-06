const globalScore = require('../models/global-score');

module.exports.add = (newGlobalScore, callback) => {
    newGlobalScore.save(callback);
};

module.exports.getGlobalScoreById = (id, callback) => {
    globalScore.findById(id)
        .populate('user')
        .exec(callback);
};

module.exports.getGlobalsScores = (callback) => {
    globalScore.find()
        .sort({ score: -1 })
        .exec(callback);
};

module.exports.getGlobalScoreByUser = (userid, callback) => {
    globalScore.find({ 'user':  userid})
    .sort({ score: -1 })
    .limit(1)
    .exec(callback);
};

module.exports.delelte = (id, callback) => {
    globalScore.findByIdAndRemove(id, callback);
};
