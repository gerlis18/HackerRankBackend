const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userMiddleware = require('../middlewares/userMiddleware');
const config = require('../config/database');
const Imagen = require('../models/images');
const imagenMiddleware = require('../middlewares/imageMiddleware');
const defaultImage = 'http://localhost:3000/uploads/avatars/avatar-default-2.png'
const acl = require('../config/acl');
const auth = require('../middlewares/auth');
const moment = require('moment');

//Register
router.route('/')
    .post((req, res, next) => {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            imageUrl: defaultImage
        });
        userMiddleware.addUser(newUser, (err, user) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Error al registrar usuario",
                    error: err
                });
            } else {
                res.json({
                    success: true,
                    msg: "Usuario registrado"
                });
                acl.addUserRoles(Object.toString(newUser._id), 'user', (err) => {
                    if (err) {
                        console.log('Oo´ps: ' + err);
                    }
                })
            }
        })
    })
    //profiles
    .get((req, res, next) => {
        User.find({}, "name email username imageUrl", function (err, users) {
            if (!err) {
                return res.status(200).json({
                    status: true,
                    statusCode: res.statusCode,
                    users,
                });
            } 

            console.log(err);
        });
    });


//profile
router.route('/:id')
    .get(auth.isAuth, auth.isAdmin,(req, res, next) => {
        User.findById(req.params.id, function (err, user) {
            if (!err) {
                acl.userRoles(Object.toString(user._id), (err, roles) => {
                    if (!err) {
                        res.json({
                            user: user,
                            roles: roles
                        });
                    } else {
                        console.log(err);
                    }

                })
                return user;
            } else {
                res.status(400).json({
                    status: false,
                    code: res.statusCode,
                    msg: 'Ocurrio un error al traer el usuario'
                })
            }
        });
    })
    .put((req, res, next) => {
        let updateUser = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            imageUrl: req.body.imageUrl
        };

        userMiddleware.updateUser(req.params.id, updateUser, (err, newUser) => {
            if (!err) {
                res.json({
                    success: true,
                    statusCode: res.statusCode,
                    msg: 'Se ha actualizado su informacion',
                    updateUser: newUser
                });
            } else {
                res.status(400).json({
                    success: false,
                    statusCode: res.statusCode,
                    msg: 'Hubo un error al actualizar su informacion'
                });
                console.log(err);
            }
        });
    })
    .delete((req, res, next) => {
        userMiddleware.deleteUser(req.params.id, (err) => {
            if (!err) {
                res.json({
                    success: true,
                    statusCode: res.statusCode,
                    msg: 'Se ha eliminado el Usuario'
                });
                next();
            } else {
                res.status(400).json({
                    success: false,
                    statusCode: res.statusCode,
                    msg: 'Hubo un error al eliminar el Usuario'
                });
                console.log(err);
            }
        });
    });

//Authenticate
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

        userMiddleware.comparePassword(password, user.password, (err, isMatch) => {
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
                        email: user.email
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