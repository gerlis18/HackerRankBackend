const router = require('express').Router();
const globalScoreMiddleware = require('../middlewares/global-score-middleware');
const GlobalScore = require('../models/global-score');

router.route('/')
.post((req, res, next) => {
    let newGlobalScore = new GlobalScore({
        user: req.body.user,
        score: req.body.score,
        time: req.body.time,
        totalTime: req.body.totalTime
    });

    globalScoreMiddleware.add(newGlobalScore, (err, globalScore) => {
        if (err) {res.status(400); return next(err);}

        res.status(200).json({
            status: true,
            statusCode: res.statusCode,
            globalScore
        });
        next();
    });
})
.get((req, res, next) => {
    globalScoreMiddleware.getGlobalsScores((err, scores) => {
        if (err) {throw err;}

        res.json({
            scores
        });
        next();
    });
});

router.route('/:id')
.get((req, res, next) => {
    globalScoreMiddleware.getGlobalScoreById(req.params.id, (err, globalScore) => {
        if (err) { res.status(400); throw err; }

        res.status(200).json({
            status: true,
            statusCode: res.statusCode,
            globalScore
        });
        next();
    });
})
.delete((req, res, next) => {
    globalScoreMiddleware.delelte(req.params.id, (err) => {
        if (err) { res.status(400); throw err; }

        res.status(200).json({
            status: true,
            statusCode: res.statusCode,
            msg: 'Global Score eliminado con el id: ' + req.params.id
        });
        next();
    });
});

router.route('/user/:id')
    .get((req, res, next) => {
        globalScoreMiddleware.getGlobalScoreByUser(req.params.id, (err, result) => {
            if (err) { res.status(400); next(err); }

            res.status(200).json({
                result
            });
            next();
        });
    });

module.exports = router;