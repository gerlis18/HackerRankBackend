const mongoose = require('mongoose');
const config = require('../config/database');

//test Schema

const testSchema = mongoose.Schema({
    title: { type: String, required: true },
    exampleHtml: { type: String, required: true },
    language: {
        java: {
            sourceCodeUrl: { type: String, required:  true }
        },
        csharp: {
            sourceCodeUrl: { type: String, required:  true }
        }
    },
    dificulty: { type: String, required: true }
});

module.exports = mongoose.model('Test', testSchema);
