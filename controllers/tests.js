const router = require('express').Router();
const test = require('../middlewares/testMiddleware');
const testModel = require('../models/tests');

router.route('/register').post((req, res) => {
    const newTest = new testModel({
        title: req.body.title,
        exampleHtml: req.body.exampleHtml,
        language: req.body.language,
        sourceCodeUrl: req.body.sourceCode,
        dificulty: req.body.dificulty
    });


    test.addTest(newTest, (err, test) => {
        if (!err) {
            res.send(test);
        }else{
            res.send(err);
        }
    });
});


router.route('/').get(function(req, res) {
    test.getTests((err, test) => {
        if (!err) {
            res.send(test);
        }
    })
});

router.route('/:id').get(function(req, res) {
    test.getTestById(req.params.id, (err, test) => {
        if (!err) {
            res.send(test);
        } else {
            res.send(err);
        }
    })
});


module.exports = router;