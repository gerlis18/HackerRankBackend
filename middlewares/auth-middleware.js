const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports.isAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            msg: 'No te has loggeado'
        });
    }

    const token = req.headers.authorization;
    //console.log('authorization: '+ req.headers.authorization);
    const payload = jwt.decode(token, config.secret);
    req.user = payload.sub
    next();
}

module.exports.isAdmin = function(req, res, next) {
    if (!req.headers.admin) {
        return res.status(403).send({
            status: false,
            statusCode: res.statusCode,
            msg: 'No tienes autorizacion para esta accion'
        });
    }
    next();
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}