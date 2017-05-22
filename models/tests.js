const mongoose = require('mongoose');
const config = require('../config/database');

//test Schema

const testSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    example: {type: String, required: true},
    imageUrl: {type: String, required: true},
    language: {type: String, required: true},
    sourceCodeUrl: {type: String, required: true},
    dificulty: { type: String, required: true }
});

module.exports = mongoose.model('Test', testSchema);


