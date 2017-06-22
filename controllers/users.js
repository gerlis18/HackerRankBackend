const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userMiddleware = require('../middlewares/user-middleware');
const defaultImage = 'http://localhost:3000/uploads/avatars/avatar-default-2.png'
const auth = require('../middlewares/auth-middleware');


//Register
router.route('/')
    .post((req, res, next) => {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            imageUrl: defaultImage,
            isAdmin: req.body.isAdmin
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
    .get((req, res, next) => {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                return res.json({
                    status: false,
                    statusCode: res.statusCode,
                    msg: `ocurrio un error al buscar por id ${err}`
                });
            }

            res.status(200).json({
                status: true,
                code: res.statusCode,
                user: user
            })
        });
    })
    .put((req, res, next) => {
        let updateUser = {
            email: req.body.email,
            username: req.body.username,
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
                next(err);
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
module.exports = router;