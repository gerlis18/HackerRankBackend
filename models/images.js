const mongoose = require('mongoose')
, Schema = mongoose.Schema;

const img_schema = mongoose.Schema({
    title: {type: String, required: true},
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    file: { type: Object, required: true }
});

module.exports = mongoose.model('Image', img_schema);

