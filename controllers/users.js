const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userMiddleware = require('../middlewares/userMiddleware');
const config = require('../config/database');
const Imagen = require('../models/images');
const imagenMiddleware = require('../middlewares/imageMiddleware');
//const upload = multer({ dest: '../public/uploads/' });
const defaultImage = 'http://localhost:3000/uploads/avatars/avatar-default-2.png'

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
        }
    })
})
//profiles
.get((req, res, next) => {
      User.find({},"name email username imageUrl",function(err, docs) {
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
router.get('/:id', (req, res, next) => {
      User.findById(req.params.id, function(err, user) {
          if (!err) {
              res.send(user);
              return user;
          } else { console.log(err); }
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
                msg: 'User not found'
            });
        }

        userMiddleware.comparePassword(password, user.password, (err, isMatch) => {
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
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password'
                });
            }
        });
    });
});
module.exports = router;