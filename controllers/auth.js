const express = require('express');
const router = express.Router();
const moment = require('moment');
const config = require('../config/database');
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const user = res.locals.user;

    if(!user){
        return res.status(404).json({ error: 'No existe el usuario' });
    }

    const token = jwt.sign(user, config.secret, {
        expiresIn: moment().add(1, 'days').unix()
    });
    res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
            id: user._id,
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            imageUrl: user.imageUrl,
            jobTitle: user.jobTitle,
            isAdmin: user.isAdmin
        }
    });
});

module.exports = router;