const router = require('express').Router();
const userTestModel = require('../models/usersTest');
const userTestMiddleware = require('../middlewares/userTestMiddleware');

router.route('/')
.post((req, res) => {
    const newUserTest = new userTestModel({
        user: req.body.user,
        language: req.body.language,
        dateTime: new Date().toJSON(),
        test: req.body.test,
        testOK: req.body.testOK,
        testNoOK: req.body.testNoOK,
        state: req.body.state,
        score: req.body.score
    });

    userTestMiddleware.add(newUserTest, (err) => {
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
    userTestMiddleware.getUserTests((err, userTests) => {
        if (!err) {
            res.send(userTests);
        } else {
            res.send(err);
        }
    })
});

router.route('/:id')
.get((req, res) => {
    userTestMiddleware.getUserTestById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});

module.exports = router;