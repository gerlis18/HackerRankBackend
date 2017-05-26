const router = require('express').Router();
const challengesDetail = require('../models/challengesDetail');
const challengesDetailMiddleware = require('../middlewares/challengesDetailMiddleware');

router.route('/')
.post((req, res) => {
    const newUserTest = new challengesDetail({
        user: req.body.user,
        language: req.body.language,
        dateTime: new Date().toJSON(),
        test: req.body.test,
        testOK: req.body.testOK,
        testNoOK: req.body.testNoOK,
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
    challengesDetailMiddleware.getUserTestById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});

module.exports = router;