var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResearchTraining_Schema = new Schema({
    researcherId: { type: String, required: true },
    researchTopic: { type: String, default: null },
    trainingName: { type: String, default: null },
    trainingType: { type: String, default: null },
    trainingLevel: { type: String, default: null },
    trainingYear: { type: String, default: null },
    trainingStartDate: { type: String, default: null },
    trainingFinishDate: { type: String, default: null },
    trainingLocation: { type: String, default: null },
    scholarshipType: { type: String, default: null },
    scholarshipLimit: { type: String, default: null },
    orderCode: { type: String, default: null },
    approveDate: { type: String, default: null },

    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResearchTraining', ResearchTraining_Schema);