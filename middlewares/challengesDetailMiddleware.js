const challengesDetail = require('../models/challengesDetail');

module.exports.add = (newUserTest, callback) => {
    newUserTest.save(callback);
}

module.exports.getUserTests = (callback) => {
    challengesDetail.find(callback);
}

module.exports.getUserTestById = (id, req, res) => {
    challengesDetail.findById(id)
    .populate('user')
    .exec(function(err, userTest) {
        if (!err) {
            res.status(200).json({
                success: true,
                status: res.statusCode,
                userTest: userTest
            })
        } else {
            res.status(400).json({
                success: true,
                status: res.statusCode,
                msg: 'Hubo un error al consultar por id'
            });
            console.log(err);
        }
    });
}
