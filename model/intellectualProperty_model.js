var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntellectualProperty_Schema = new Schema({
    researcherId: { type: String, required: true },
    intPropertyCode: { type: String, default: null },
    intPropertyRegisterDate: { type: String, default: null },
    licenseCode: { type: String, default: null },
    intPropertyName: { type: String, default: null },
    licenseType: { type: String, default: null },
    claimBy: { type: String, default: null },
    coCreation: { type: String, default: null },

    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IntellectualProperty', IntellectualProperty_Schema);