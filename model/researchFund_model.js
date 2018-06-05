var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResearchFund_Schema = new Schema({
    researcherId: { type: String, default: null },
    researchName: { type: String, required: true },
    fundSource: { type: String, default: null },
    scholarshipYear: { type: String, default: 0 },
    scholarshipStart: { type: String, default: null },
    scholarshipEnd: { type: String, default: null },
    progress6MonthDate: { type: String, default: null },
    progress6MonthPercent: { type: String, default: null },
    progress12MonthDate: { type: String, default: null },
    progress12MonthPercent: { type: String, default: null },
    extend1: { type: String, default: null },
    extend2: { type: String, default: null },

    fullPaperDate: { type: String, default: null },
    result1: { type: String, default: null },
    result2: { type: String, default: null },
    finishDate: { type: String, default: null },
    perYear: { type: String, default: null },
    continueYear: { type: String, default: null },
    maximumFund: { type: String, default: null },
    ratio: { type: String, default: null },
    role: { type: String, default: null },
    before2561Inside: { type: String, default: null },
    before2561Outside: { type: String, default: null },
    after2561: { type: String, default: null },
    detail: { type: String, default: null },

    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResearchFund', ResearchFund_Schema);