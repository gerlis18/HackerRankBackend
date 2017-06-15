const Imagen = require('../models/images');

module.exports.findImage = function (req, res, next) {
    console.log("Parametro " + req.params.id);
    Imagen.findById(req.params.id)
        .populate("creator")
        .exec(function (err, imagen) {
            if (imagen != null) {
                res.send(imagen.creator);
                next();
            } else {
                res.send(err);
            }
        })
}