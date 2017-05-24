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
             res.json({
                success: true,
                statusCode: res.statusCode,
                msg: 'Se ha creado un nuevo Test'
            });
        } else {
             res.status(400).json({
                success: false,
                statusCode: res.statusCode,
                msg: 'hubo un error al crear el Test'
            });
            console.log(err);
        }
    });
});


router.route('/').get(function (req, res) {
    test.getTests((err, test) => {
        if (!err) {
            res.json({
                success: true,
                status: res.statusCode,
                tests: test
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'hubo un error al consultar el test',
                statusCode: res.statusCode
            });
            console.log(err);
        }
    })
});

router.route('/:id')
    .get(function (req, res) {
        test.getTestById(req.params.id, (err, test) => {
            if (!err) {
                res.json({
                    success: true,
                    statusCode: res.statusCode,
                    test: test
                });
            } else {
                res.status(400).json({
                    success: false,
                    msg: 'hubo un error al consultar el test por su id',
                    statusCode: res.statusCode
                })
                console.log(err);
            }
        })
        
    })
    .put(function (req, res) {

        let updateTest = {
            title: req.body.title,
            exampleHtml: req.body.exampleHtml,
            sourceCodeUrl: req.body.sourceCode,
            dificulty: req.body.dificulty
        };

        test.updateTest(req.params.id, updateTest, (err, newTest) => {
            if (!err) {
                res.json({
                    success: true,
                    statusCode: res.statusCode,
                    msg: 'Se ha actualizado el Test',
                    newTest: updateTest
                });
            } else {
                res.status(400).json({
                    success: false,
                    statusCode: res.statusCode,
                    msg: 'Hubo un error al actualizar el test'
                });
                console.log(err);
            }
        })
    })
    .delete(function (req, res) {
        test.deleteTest(req.params.id, (err) => {
            if (!err) {
                res.json({
                    success: true,
                    statusCode: res.statusCode,
                    msg: 'Se ha eliminado el Test'
                });
            } else {
                res.status(400).json({
                    success: false,
                    statusCode: res.statusCode,
                    msg: 'Hubo un error al eliminar el Test'
                });
                console.log(err);
            }
        })
    });


module.exports = router;