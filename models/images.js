const mongoose = require('mongoose');

const img_schema = mongoose.Schema({
    title: {type: String, required: true}
});

const  Imagen = module.exports = mongoose.model('Image', img_schema);

