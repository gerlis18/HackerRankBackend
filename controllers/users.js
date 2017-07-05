const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userMiddleware = require('../middlewares/user-middleware');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/')
    // Get All Profiles
    .get((req, res, next) => {
        User.find({}, "name surname email username imageUrl", function (err, users) {
            if (!err) {
                return res.status(200).json({
                    status: true,
                    statusCode: res.statusCode,
                    users,
                });
            }

		next(err);
	});
});


// Get profile by username
router.route('/:username')
    .get((req, res) => {
        userMiddleware.getUserByUsername(req.params.username, (err, user) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    statusCode: res.statusCode,
                    msg: `ocurrio un error al buscar por id ${err}`
                });
            }

            if(!user){
                return res.status(404).json({
                    status: false,
                    statusCode: res.statusCode,
                    msg: `El usuario con el nombre de usuario ${req.params.username} no existe.`
                })
            }

            res.json({
                status: true,
                code: res.statusCode,
                user: user
            });
        });
    })
    .put((req, res, next) => {
        let updateUser = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            imageUrl: req.body.imageUrl,
            isAdmin: req.body.isAdmin
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
    .delete(authMiddleware.isAdmin, (req, res, next) => {
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
            }
        });
    });

router.route('/updateImage/:id')
    .put((req, res, next) => {
        var imageUrl = req.body.imageUrl;

        userMiddleware.updateImage(req.params.id, imageUrl, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                status: true,
                statusCode: res.statusCode,
                msg: "¡Imagen actualizada!"
            });
        });
    });

module.exports = router;