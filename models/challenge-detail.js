const mongoose = require('mongoose');

const challengeDetailsTestSchema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    time:{ type: String, required: true },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Tests", required: true },
    challengeOK: { type: Number, required: true },
    challengeNoOK: { type: Number, required: true },
    state: { type: String, required: true },
    percentage: { type: String, required: true },
    score: { type: Number, required: true }
};

module.exports = mongoose.model('ChallengeDetails', challengeDetailsTestSchema);
