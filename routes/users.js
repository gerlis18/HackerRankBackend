const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
const Imagen = require('../models/images');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    console.log(`Esta es la contraseña 1: ${newUser.password}`);

    User.addUser(newUser, (err, user) => {
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
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found'
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                req.session.user_id = user._id;
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

                res.locals = { user: user }
                console.log(res.locals.user._id);
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password'
                });
            }
        });
    });
});


//profiles
router.route('/profile')
.get((req, res, next) => {
      User.find({},"name email username",function(err, docs) {
          if (!err) {
              res.send(docs);
              return docs;
          } else { console.log(err); }
      });
})
.delete(function(req, res){
    User.findOneAndRemove({_id: req.params.id}, function(err) {
        if (!err) {
            res.json({
                success: true,
                msg: "se elimino correctamente"
            })
        }
    })
});


//profile
router.get('/profile/:id', (req, res, next) => {
      User.findById(req.params.id, function(err, docs) {
          if (!err) {
              res.send(docs);
              return docs;
          } else { console.log(err); }
      });
});

//validate
router.get('/validate', (req, res, next) => {
    res.send('validate');
});

//Avatar
router.route('/avatar')
    .post(function(req, res){
        var data = {
            title: req.body.title,
            creator: req.body.creator
        }
        console.log(data);
        /*var imagen = new Imagen(data);
        imagen.save(function(err){
            if (!err) {
                res.json({
                    success: true,
                    msg: "se creo el nuevo avatar"
                })
                //res.redirect('/avatar/'+imagen._id)
            }
        })*/
    });

router.route('/avatar/:id')
    .get(function(req, res) {
        Imagen.findById(req.params.id, function(err, imagen) {
            res.send(imagen);
            return imagen;
        })
    });

router.route('/avatar')
    .get(function(req, res) {
        Imagen.find({}, function(err, imagen) {
            res.send(imagen);
            return imagen;
        })
    });

module.exports = router;