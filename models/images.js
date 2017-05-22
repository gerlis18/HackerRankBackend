const mongoose = require('mongoose');

const img_schema = mongoose.Schema({
    title: {type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const  Imagen = module.exports = mongoose.model('Image', img_schema);

