const mongoose = require('mongoose');

//test Schema

const challengeSchema = mongoose.Schema({
    title: { type: String, required: true },
    exampleHtml: { type: String, required: true },
    language: [{
        name: {type: String, required: true},
        sourceCodeUrl: {type: String, required: true}
    }],
    dificulty: { type: String, required: true }
});

module.exports = mongoose.model('Tests', challengeSchema);

