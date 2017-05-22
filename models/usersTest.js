const mongoose = require('mongoose');
const config = require('../config/database');

const userTestSchema = {
    user: { type: Object, required: true },
    language: { type: String, required: true },
    dateTime: { type: String, required: true },
    test: { type: Object, required: true },
    testOK: { type: Number, required: true },
    testNoOK: { type: Number, required: true },
    state: { type: String, required: true },
    score: { type: Number, required: true }
}

module.exports = mongoose.model('userTest', userTestSchema);
