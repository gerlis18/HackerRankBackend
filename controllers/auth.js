const express = require('express');
const router = express.Router();
const moment = require('moment');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');
const userMiddleware = require('../middlewares/user-middleware');


router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    userMiddleware.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }

        authMiddleware.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: moment().add(1, 'days').unix()
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                });
               
            } else {
                return res.json({
                    success: false,
                    msg: 'Contraseña incorrecta'
                });
            }
        });
    });
});

module.exports = router;