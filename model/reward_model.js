var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Reward_Schema = new Schema({
    researcherId: { type: String, required: true },
    rewardName: { type: String, required: true },
    studentName: { type: String, default: null },
    rewardFrom: { type: String, default: null },
    
    rewardDate: { type: String, default: null },
    rewardYear: { type: String, default: null },
    rewardRank: { type: String, default: null },
    
    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reward', Reward_Schema);