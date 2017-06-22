const mongoose = require('mongoose');

const globalScoreSchema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    time:{ type: String, required: true },
    totalTime: { type: String, required: true }
}; 

module.exports = mongoose.model('globalScore', globalScoreSchema);
