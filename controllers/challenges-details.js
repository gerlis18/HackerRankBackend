const router = require('express').Router();
const challengesDetail = require('../models/challenge-detail');
const challengesDetailMiddleware = require('../middlewares/challenges-detail-middleware');

router.route('/')
.post((req, res) => {
    const newUserTest = new challengesDetail({
        user: req.body.user,
        dateTime: new Date().toJSON(),
        challenge: req.body.challenge,
        challengeOK: req.body.challengeOK,
        challengeNoOK: req.body.challengeNoOK,
        state: req.body.state,
        score: req.body.score
    });

    challengesDetailMiddleware.add(newUserTest, (err) => {
        if (!err) {
            res.json({
                success: true,
                msg: "Se ha guardado Correctamente"
            })
        } else {
            res.send(err);
        }
    })
})
.get((req, res) => {
    challengesDetailMiddleware.getUserTests((err, userTests) => {
        if (!err) {
            res.send(userTests);
        } else {
            res.send(err);
        }
    })
});

router.route('/:id')
.get((req, res) => {
    challengesDetailMiddleware.getUserTestById(req.params.id, req, res);
});

module.exports = router;