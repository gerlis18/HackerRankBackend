const challengesDetail = require('../models/challenge-detail');

module.exports.add = (newUserTest, callback) => {
    newUserTest.save(callback);
}

module.exports.getUserTests = (callback) => {
    challengesDetail.find(callback);
}

module.exports.getUserTestById = (id, req, res) => {
    challengesDetail.findById(id)
        .populate('user')
        .populate('challenge')
        .exec(function (err, userTest) {
            if (!err) {
                res.status(200).json({
                    success: true,
                    status: res.statusCode,
                    challengeDetail: userTest
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

module.exports.getUserScore = (userid, challenge, req, res) => {

    const criteriaFirst = { 'user': userid, 'challenge': challenge, 'state': 'Download' };
    challengesDetail.find(criteriaFirst).sort({ 'time': 'desc' }).findOne().exec(function (err, detail) {
        if (detail && detail._doc) {
            var initial = detail._doc.timestamp;
            const criteriaSecond = { 'user': userid, 'challenge': challenge, 'state': { '$ne': 'Download' } };
            challengesDetail.find(criteriaSecond).sort({ 'time': 'desc' }).findOne().exec(function (err, elem) {
                if (elem && elem._doc) {
                    var final = elem._doc.timestamp;
                    var difference = final - initial;
                    var secondsDifference = Math.floor(difference/1000);
                    res.status(200).json({
                        success: true,
                        status: res.statusCode,
                        msg: 'Diferencia Tiempo: '+secondsDifference
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        status: res.statusCode,
                        msg: 'No se encontro informacion final de usuario: ' + userid + ' - prueba: ' + challenge
                    });
                }

            });

        } else {

            res.status(400).json({
                success: true,
                status: res.statusCode,
                msg: 'No se encontro informacion de usuario: ' + userid + ' - prueba: ' + challenge
            });


        }
    });
}

